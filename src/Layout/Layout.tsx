import React from "react";
import { Outlet} from "react-router-dom";
import Header from "../components/Header";
import {useBasket} from "../hooks/useBasket";

function Layout() {
    const basket = useBasket()
    return (
        <>
            <Header />
            <div className="w-full flex justify-center py-5">
                <div className="w-full xs:w-11/12 flex justify-center">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
