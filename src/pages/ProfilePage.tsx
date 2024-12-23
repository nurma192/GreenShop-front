import React, {useEffect, useState} from 'react';
import ListBox from "../components/ListBox";
import ProfileInformationPage from "./ProfileInformationPage";
import {useAuth} from "../hooks/useAuth";
import AddItem from "./AddItem";
import WishlistPage from "./WishlistPage";
import MyOrdersPage from "./MyOrdersPage";

export type ActiveSection = 'profile' | 'logout' | 'addCategory' | 'wishlist' | 'addItem' | 'itemsControl' | 'myOrders';

function ProfilePage() {
    const [activeSection, setActiveSection] = useState<ActiveSection>('profile');

    const auth = useAuth()
    useEffect(() => {
        if (activeSection === 'logout'){
            auth.logout()
        }
    }, [activeSection]);
    return (
        <div className={`w-full flex gap-6`}>
            <div className="w-1/5 max-w-[260px]">
                <ListBox variant={activeSection} setVariants={setActiveSection}/>
            </div>
            <div className="w-4/5">
                {activeSection === 'profile' && (<ProfileInformationPage />)}
                {activeSection === 'addItem' && (<AddItem />)}
                {activeSection === 'myOrders' && (<MyOrdersPage />)}
                {activeSection === 'wishlist' && (<WishlistPage />)}
            </div>
        </div>
    )
        ;
}




export default ProfilePage;
