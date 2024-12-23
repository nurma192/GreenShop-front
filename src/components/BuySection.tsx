import React, {useEffect, useState} from 'react';
import {SlBasket} from "react-icons/sl";
import {CiHeart} from "react-icons/ci";
import MyButton from "./ui/MyButton";
import {FaHeart} from "react-icons/fa";
import {GetItemResponse} from "../models/response/GetItemResponse";
import {useAddBasket} from "../api/basket/addBasketApi";
import {CircularProgress} from "@nextui-org/react";
import {useRemoveFromWishlist} from "../api/wishlist/removeFromWishlist";
import {useAddWishlist} from "../api/wishlist/addWishlistApi";
import {useGetWishlist} from "../api/wishlist/getWishlistApi";

interface Props {
    item: GetItemResponse;
}

function BuySection({item}: Props) {
    const [itemCount, setItemCount] = useState(1);
    const {mutate: addBasket, ...addBasketReq} = useAddBasket()
    const {mutate: removeFromWishlist, ...removeFromWishlistReq} = useRemoveFromWishlist()
    const {mutate: addToWishlist, ...addToWishlistReq} = useAddWishlist()
    const getWishlistReq = useGetWishlist()
    const [like, setLike] = useState<boolean>(false)

    useEffect(() => {
        if (getWishlistReq.isSuccess) {
            setLike(!!getWishlistReq.data.items.find(i => i.item._id === item._id))
            // console.log(getWishlistReq.data.items[0])
        }
    }, [getWishlistReq.data]);


    const handleLikeClick = () => {
        if (like) {
            removeFromWishlist(item._id, {
                onSuccess: () => {
                    setLike(false)
                }
            })
        } else {
            addToWishlist(item._id, {
                onSuccess: () => {
                    setLike(true)
                }
            })
        }
    }

    const handleMinusClicked = () => {
        if (itemCount === 1) return
        setItemCount(itemCount - 1)
    }
    const handlePlusClicked = () => {
        setItemCount(itemCount + 1)
    }
    return (
        <div>
            <div className={`flex gap-2 items-center`}>
                <label className={`text-text-color text-base font-bold`}>Size:</label>
                <SelectSizeComponent active={true}>{item.size}</SelectSizeComponent>
            </div>
            <div className="flex flex-col md:flex-row mt-2">
                <div className="flex items-center gap-4">
                    <p className={`px-3 py-1.5 bg-primary rounded-xl text-secondary select-none cursor-pointer transition hover:opacity-90`}
                       onClick={() => handleMinusClicked()}
                    >-</p>
                    <p className={`text-xl text-text-color`}>{itemCount}</p>
                    <p className={`px-3 py-1.5 bg-primary rounded-xl text-secondary select-none cursor-pointer transition hover:opacity-90`}
                       onClick={() => handlePlusClicked()}
                    >+</p>
                </div>
                <div className="flex gap-2.5 ml-4 h-full">
                    <MyButton className={`py-2 px-4 font-bold`}>BUT NOW</MyButton>
                    <MyButton className={`flex items-center py-2 px-4 gap-1 font-bold`} color={`transparent`}
                              icon={addBasketReq.isLoading ?
                                  <CircularProgress color={`primary`} size={`sm`} classNames={{svg: "w-5 h-5"}}/> :
                                  <SlBasket/>}
                              onClick={() => addBasket({
                                  itemId: item._id,
                                  quantity: itemCount.toString()
                              })}
                    >
                        ADD TO BASKET
                    </MyButton>
                    <MyButton className={`px-2 font-bold`} color={`transparent`}
                              icon={
                                  (removeFromWishlistReq.isLoading || addToWishlistReq.isLoading) ? <CircularProgress color={`primary`} size={`sm`} classNames={{svg: "w-5 h-5"}}/>
                                  : (!(like) ?
                                      <CiHeart className={`text-xl`}/> :
                                      <FaHeart className={`text-xl fill-red-500`}/>)
                              }
                              onClick={handleLikeClick}
                    >
                    </MyButton>
                </div>
            </div>
        </div>
    );
}

type SelectSizeComponentProps = {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}

const SelectSizeComponent = ({children, active = false, onClick}: SelectSizeComponentProps) => {
    return (
        <div
            className={`border h-[28px] w-[28px] flex justify-center transition items-center rounded-full select-none cursor-pointer ${active ? 'border-primary text-primary font-bold' : 'border-[#EAEAEA] text-[#727272]'}`}
            onClick={onClick}
        >{children}</div>
    )
}

export default BuySection;
