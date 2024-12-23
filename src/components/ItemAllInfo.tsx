import React from 'react';
import {CircularProgress, Skeleton} from "@nextui-org/react";
import {UseQueryResult} from "react-query";
import {GetItemResponse} from "../models/response/GetItemResponse";
import BuySection from "./BuySection";
import MyButton from "./ui/MyButton";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useDeleteItem} from "../api/deleteItemApi";
import {useNavigate} from "react-router-dom";

interface Props {
    itemQuery: UseQueryResult<GetItemResponse>
}

function ItemAllInfo({itemQuery}: Props) {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user)
    const {mutate: deleteItem ,...deleteItemReq} = useDeleteItem()

    const handleDeleteItem = () => {
        if (itemQuery.isSuccess){
            deleteItem(itemQuery.data._id, {
                onSuccess: () => {
                    navigate('/')
                }
            })
        }
    }

    return (
        <div className={`flex flex-col items-start`}>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full ${itemQuery.isLoading ? 'h-[24px]' : 'h-auto'} rounded`}>
                {itemQuery.isSuccess && <h3 className={`text-2xl font-extrabold`}>{itemQuery.data.title}</h3>}
            </Skeleton>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full ${itemQuery.isLoading ? 'h-[24px]' : 'h-auto'} rounded my-2`}>
                {itemQuery.isSuccess &&
					<h3 className={`text-md text-primary font-bold`}>${itemQuery.data.cost}.00</h3>}
            </Skeleton>
            <hr className="w-full h-[2px]"/>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full ${itemQuery.isLoading ? 'h-[100px]' : 'h-auto'} rounded mt-4`}>
                {itemQuery.isSuccess && <div>
					<div>
						<label className={`text-text-color text-base font-bold`}>Short Description</label>
						<p className={`text-text-color text-sm`}>{itemQuery.data.shortDescription}</p>
					</div>
				</div>}
            </Skeleton>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full ${itemQuery.isLoading ? 'h-[100px]' : 'h-auto'}  rounded my-4`}>
                {itemQuery.isSuccess && <BuySection item={itemQuery.data} />}
            </Skeleton>

            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full ${itemQuery.isLoading ? 'h-[100px]' : 'h-auto'}  rounded mt-4`}>
                {itemQuery.isSuccess && <div className={``}>
                    {itemQuery.data.sku && (<p><span>SKU: </span>{itemQuery.data.sku}</p>)}
                    {itemQuery.data.categories && (<p><span>Categories: </span>{itemQuery.data.categories.map((category) => (category.name)).join(`, `)}</p>)}
                    {itemQuery.data.tags.length > 0 && (<p><span>Tags:</span>{itemQuery.data.tags.join(', ')}</p>)}
                </div>}
            </Skeleton>

            {!!user && user.role === 'admin' &&
                <MyButton color={`danger`}
                          className={`mt-4 py-2 px-5`}
                          disabled={deleteItemReq.isLoading}
                          onClick={() => handleDeleteItem()}
                >Delete Item
                    {deleteItemReq.isLoading && <CircularProgress color={`primary`} size={`sm`} classNames={{svg: "w-5 h-5"}}/>}
                </MyButton>}

        </div>
    );
}



export default ItemAllInfo;
