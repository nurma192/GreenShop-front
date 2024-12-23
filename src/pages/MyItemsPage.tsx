import React from "react";
import {useUserData} from "../api/userDataApi";
import {CircularProgress} from "@nextui-org/react";
import {ItemType} from "../types/itemTypes";

type Props = {
    activeSection: ItemType
}
function MyItemsPage({activeSection}:Props) {
    const {data, isSuccess, isLoading, isError, refetch} = useUserData()

    const updateUserData = () => [
        refetch()
    ]

    return (
        <div className={`w-full`}>
            <h3 className={`font-bold text-2xl`}>My {activeSection} Items</h3>
            {isLoading && <CircularProgress />}
            {isError && <h3>Error :(((</h3>}
            {isSuccess && <div>
                {/*{activeSection === 'found' && <ShowItemsGrid items={data.findItems} isMyItems={true} updateUserData={updateUserData}/>}*/}
                {/*{activeSection === 'lost' && <ShowItemsGrid items={data.lostItems} isMyItems={true} updateUserData={updateUserData} />}*/}
            </div>}
        </div>
    )
}

export default MyItemsPage;