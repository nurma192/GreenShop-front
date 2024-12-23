import React from "react";
import {Link, useLocation} from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

function Auth() {
    const location = useLocation();

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 w-full pt-20">
            <div className=" w-[500px] bg-white py-5 px-24 rounded-t-lg shadow-lg flex flex-col gap-2 ">
                <div className="w-full flex justify-center items-center gap-5 my-5">
                    <Link to={"/login"}
                          className={`text-xl ${location.pathname === "/login" ? " text-primary" : " text-black"}`}>Login</Link>
                    |
                    <Link to={"/register"}
                          className={`text-xl ${location.pathname === "/register" ? " text-primary" : " text-black"}`}>Register</Link>
                </div>
                <p className="text-gray-600 text-xs">
                    {location.pathname === "/register" ? "Enter your email and password to register." : "Enter your username and password to login."}
                </p>

                {location.pathname === "/login" && <LoginForm />}
                {location.pathname === "/register" && <RegisterForm />}

            </div>
            <div className="w-[500px] h-3 bg-primary"></div>

        </div>
    );
}

export default Auth;
