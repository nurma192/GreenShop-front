import React, {useEffect, useState} from 'react';
import {useAddBasket} from "../api/basket/addBasketApi";
import {useRemoveFromWishlist} from "../api/wishlist/removeFromWishlist";
import {useAddWishlist} from "../api/wishlist/addWishlistApi";
import {useGetWishlist} from "../api/wishlist/getWishlistApi";
import ShowItemsGrid from "../components/ShowItemsGrid";
import {Item} from "../models/Item";
import {CircularProgress} from "@nextui-org/react";
import {ItemCard} from "../components/ItemCard";
import MyButton from "../components/ui/MyButton";

function WishlistPage() {
    const [items, setItems] = useState<Item[]>([])
    const {mutate: addBasket, ...addBasketReq} = useAddBasket()
    const {mutate: removeFromWishlist, ...removeFromWishlistReq} = useRemoveFromWishlist()
    const {mutate: addToWishlist, ...addToWishlistReq} = useAddWishlist()
    const getWishlistReq = useGetWishlist()

    useEffect(() => {
        if (getWishlistReq.isSuccess) {
            console.log("New Loading data >>>")
            let arr: Item[] = []
            getWishlistReq.data.items.forEach(item => {
                arr.push({
                    id: item.item._id,
                    title: item.item.title,
                    cost: item.item.cost,
                    images: item.item.images,
                    reviewsCount: item.item.reviewsCount,
                    averageRating: item.item.averageRating
                })
            })
            console.log(arr)
            setItems(arr)
        }
    }, [getWishlistReq.data, getWishlistReq.isSuccess]);

    const deleteFromWishlist = (itemId: string) => {

    }

    return (
        <div className={`w-full`}>
            {getWishlistReq.isLoading && <CircularProgress color={`primary`}/>}
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 xl2:grid-cols-4 gap-8 mt-5">
                {items.map((item, index) => (
                    <div className={`w-full flex flex-col items-center justify-center`}>
                        <ItemCard item={item} key={item.id}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WishlistPage;
