import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {useVerifyAccount} from "../api/auth/verifyAccount";

type Props = {}

function VerifyPage(props: Props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const {mutate: verifyAccount, isError, isSuccess, error} = useVerifyAccount()

    useEffect(() => {
        const token = searchParams.get("token")
        if (token) {
            verifyAccount(token)
        }
    }, [])

    return (
        <div>
            {isSuccess && <h1 className={`text-3xl`}>Your Account Verified Successfully :)</h1>}
            {isError && <h1 className={`text-3xl`}>
		        Error when Verifying Your Account :( {error instanceof Error ? error.message : JSON.stringify(error)}
	        </h1>}
        </div>
    );
}

export default VerifyPage;
