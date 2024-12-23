import React from "react";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";

function ChangePasswordPage() {
    return (
        <div className="flex flex-col gap-2 w-full max-w-[400px]">
            <h3>Change Password</h3>
            <ChangePasswordForm />
        </div>
    )
}

export default ChangePasswordPage