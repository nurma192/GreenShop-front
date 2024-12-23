import React, {useEffect, useRef, useState} from 'react';
import MyLink from "./ui/MyLink";
import MyButton from "./ui/MyButton";
import {useUserData} from "../api/userDataApi";
import {CircularProgress, useSelect} from "@nextui-org/react";
import {useCustomParams} from "../hooks/useCustomParams";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

function Header() {
    const inputRef = useRef<HTMLInputElement>(null);
    const userData = useUserData()
    const customParam = useCustomParams()
    const navigate = useNavigate()
    const [isInputOpen, setIsInputOpen] = useState<boolean>(!!customParam.getQueryFromParam())
    const [searchText, setSearchText] = useState<string>(customParam.getQueryFromParam())
    const user = useSelector((state: RootState) => state.user.user);

    const toggleOpenInput = (): void => {
        if (!(isInputOpen && searchText !== '')) {
            setIsInputOpen(!isInputOpen)
        }
        submitSearch()
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const submitSearch = () => {
        customParam.setQueryToParam(searchText)
    }

    const goToHome = () => {
        customParam.resetAllParams()
        navigate("/")
    }

    useEffect(() => {
        setSearchText(customParam.getQueryFromParam())
        // console.log(user)
    }, [customParam.searchParams]);

    return (
        <header className="w-full flex justify-around items-center gap-5 py-5 text-white">
            <div className="cursor-pointer" onClick={() => goToHome()}>
                <img className="w-[205px]" src="/icons/greenshopLogo.svg" alt="logo"/>
            </div>
            <nav>
                <ul className="hidden sm:flex gap-4">
                    <li>
                        <MyLink className="text-black" to={`/`}>
                            Home
                        </MyLink>
                    </li>
                    <li>
                        <MyLink className="text-black" to={`/basket`}>
                            My Basket
                        </MyLink>
                    </li>
                    <li>
                        <MyLink className="text-black" to={`/support`}>
                            Support
                        </MyLink>
                    </li>
                </ul>
            </nav>
            <div className="flex gap-2">
                <input ref={inputRef} type="text"
                       value={searchText}
                       onChange={e => setSearchText(e.target.value)}
                       onKeyDown={e => e.key === "Enter" && submitSearch()}
                       className={` px-2 border transition-all text-md w-[0px]  text-black ${isInputOpen ? 'border-black w-[300px] ' : 'border-transparent'}`}/>
                <button className="flex relative p-2 rounded-3xl transition hover:bg-neutral-200 cursor-pointer"
                        onClick={() => toggleOpenInput()}>
                    <img src="/icons/search.svg" alt="search"/>
                </button>
                <MyButton color="primary" className="flex justify-center items-center h-8 px-5"
                          onClick={() => navigate("/profile")}>
                    <img className="w-4" src="/icons/profileIcon.svg" alt="profile"/>
                    <p className="hidden md:inline">{userData.data?.firstName} {userData.data?.lastName}</p>
                    {userData.isLoading && <CircularProgress color="secondary" size={'sm'} aria-label="Loading..."/>}
                </MyButton>
            </div>
        </header>
    );
}

export default Header;
