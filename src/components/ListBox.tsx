import {Accordion, AccordionItem, cn} from "@nextui-org/react";

import {CgProfile} from "react-icons/cg";
import {CiBoxList, CiLogout} from "react-icons/ci";
import {ActiveSection} from "../pages/ProfilePage";
import React, {useEffect} from "react";
import {RiLockPasswordLine} from "react-icons/ri";
import {FaPeopleCarryBox} from "react-icons/fa6";
import {FaHeart, FaSearch} from "react-icons/fa";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {FiBox} from "react-icons/fi";
import {IoAddCircleOutline} from "react-icons/io5";
import {GrUnorderedList} from "react-icons/gr";

interface Props {
    variant: string;
    setVariants: (key: ActiveSection) => void
}

export default function ListBox({variant, setVariants}: Props) {
    const user = useSelector((state: RootState) => state.user.user);
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    useEffect(() => {
        console.log()
    }, [variant]);

    return (
        <div
            className="w-full flex flex-col gap-1 border-small rounded p-1 border-default-200 dark:border-default-100 bg-neutral-100">
            <h3 className={`font-extrabold px-1 my-2 text-xl text-neutral-700`}>My Account</h3>
            <button
                className={`flex items-center gap-2 p-2 hover:bg-white transition rounded ${variant === 'profile' && 'bg-white'}`}
                onClick={() => setVariants("profile")}>
                <CgProfile className={iconClasses}/>
                Profile
            </button>
            <button
                className={`flex items-center gap-2 p-2 hover:bg-white transition rounded ${variant === 'wishlist' && 'bg-white'}`}
                onClick={() => setVariants("wishlist")}>
                <FaHeart  className={iconClasses}/>
                Wishlist
            </button>
            <button
                className={`flex items-center gap-2 p-2 hover:bg-white transition rounded ${variant === 'myOrders' && 'bg-white'}`}
                onClick={() => setVariants("myOrders")}>
                <GrUnorderedList className={iconClasses}/>
                My Orders
            </button>

            {
                !!user && user.role === 'admin' && (
                    <>
                        <button
                            className={`flex items-center gap-2 p-2 hover:bg-white transition rounded ${variant === 'itemsControl' && 'bg-white'}`}
                            onClick={() => setVariants("itemsControl")}>
                            <FiBox className={iconClasses}/>
                            Items Controller
                        </button>
                        <button
                            className={`flex items-center gap-2 p-2 hover:bg-white transition rounded ${variant === 'addItem' && 'bg-white'}`}
                            onClick={() => setVariants("addItem")}>
                            <IoAddCircleOutline className={iconClasses}/>
                            Add item
                        </button>
                    </>
                )
            }
            <button className={`flex items-center gap-2 p-2 hover:bg-danger group hover:text-white transition rounded`}
                    onClick={() => setVariants("logout")}>
                <CiLogout className={cn(iconClasses, `transition text-danger group-hover:text-white`)}/>
                Logout
            </button>
        </div>
    );
}