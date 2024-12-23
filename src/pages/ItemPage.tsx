import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetItemById} from "../api/getItemApi";
import ImageViewer from "../components/ImageViewer";
import ItemAllInfo from "../components/ItemAllInfo";

function ItemPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const itemsQuery = useGetItemById(id)

    if (itemsQuery.error || itemsQuery.isError) {
        navigate('/')
        return <h3>Error</h3>
    }

    return (
        <div className="flex gap-4 w-full">
            <div className="w-1/2 flex gap-7.5">
                {itemsQuery.isSuccess && <ImageViewer images={itemsQuery.data.images}/>}
            </div>
            <div className="w-1/2">
                <ItemAllInfo itemQuery={itemsQuery} />
            </div>
        </div>
    )
}

export default ItemPage;
