import {NextUIProvider} from "@nextui-org/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout/Layout";
import Auth from "./pages/Auth";
import ProtectedRoute from "./context/ProtectedRoute";
import {QueryClientProvider} from "react-query";
import queryClient from "./queryClient";
import HomePage from "./pages/HomePage";
import AddItem from "./pages/AddItem";
import ItemPage from "./pages/ItemPage";
import ProfilePage from "./pages/ProfilePage";
import {Toaster} from "sonner";
import VerifyPage from "./pages/VerifyPage";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {useEffect} from "react";
import BasketPage from "./pages/BasketPage";

function App() {
    useEffect(() => {
        const originalWarn = console.warn;
        console.warn = (...args) => {
            if (typeof args[0] === 'string' && args[0].includes('aria')) {
                return;
            }
            originalWarn(...args);
        };
        return () => {
            console.warn = originalWarn;
        };
    }, []);
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <NextUIProvider>
                    <BrowserRouter future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true
                    }}>
                        <Routes>
                            <Route element={<ProtectedRoute/>}>
                                <Route path="/" element={<Layout/>}>
                                    <Route index element={<HomePage/>}/>
                                    <Route path="/item/:id" element={<ItemPage/>}/>
                                    <Route path="/support" element={<div>Support</div>}/>
                                    <Route path="/profile" element={<ProfilePage/>}/>
                                    <Route path="/basket" element={<BasketPage/>}/>
                                </Route>
                            </Route>

                            <Route path="/login" element={<Auth/>}/>
                            <Route path="/register" element={<Auth/>}/>
                            <Route path="/verify" element={<VerifyPage/>}/>
                        </Routes>
                        <Toaster richColors/>
                    </BrowserRouter>
                </NextUIProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
