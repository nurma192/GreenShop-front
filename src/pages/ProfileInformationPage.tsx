import UpdateCredentialsForm from "../components/forms/UpdateCredentialsForm";
import {useUserData} from "../api/userDataApi";
import {CircularProgress} from "@nextui-org/react";

function ProfileInformationPage() {
    const {data, isLoading, isSuccess} = useUserData();
    return (
        <div>
            <h3 className={`text-xl text-neutral-700 font-bold mb-3`}>Personal Information</h3>
            {isLoading && <CircularProgress />}
            {isSuccess && data && <UpdateCredentialsForm userData={data} />}
        </div>
    )

}

export default ProfileInformationPage