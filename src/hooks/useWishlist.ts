import {useEffect, useState} from "react";
import {WishlistResponse} from "../models/WishlistResponse";
import {useGetWishlist} from "../api/wishlist/getWishlistApi";
import {useAddWishlist} from "../api/wishlist/addWishlistApi";
import {useRemoveFromWishlist} from "../api/wishlist/removeFromWishlist";
import {GetItemResponse} from "../models/response/GetItemResponse";

export const useWishlist = () => {
    const [wishlist, setWishlist] = useState<WishlistResponse>({
        items: []
    })
    const wishlistReq = useGetWishlist()
    const {mutate: addWishlist, ...addWishlistReq} = useAddWishlist()
    const {mutate: removeFromWishlist, ...removeWishlistReq} = useRemoveFromWishlist()

    useEffect(() => {
        if (wishlistReq.isSuccess) {
            setWishlist(wishlistReq.data)
            console.log("wishlistReq.data", wishlistReq.data)
        }
    }, [wishlistReq.data, wishlistReq.isSuccess])

    const updateAndGetWishlist = () => {
        wishlistReq.refetch().then(data => {
            console.log(data)
            if (data.data) setWishlist(data.data)
            return wishlist
        }).finally(() => {
            return wishlist
        })
    }

    const toggleAddWishlist = async (iItem: GetItemResponse) => {
        const inWishlist = !!wishlist?.items.find(item => item.item._id === iItem._id)

        if (addWishlistReq.isLoading || addWishlistReq.isError || removeWishlistReq.isLoading || removeWishlistReq.isError) {
            return
        }

        if (!inWishlist) {
            addWishlist(iItem._id, {
                onSuccess: (data) => {
                    setWishlist({
                        items: [
                            ...wishlist.items,
                            {
                                item: iItem,
                                _id: iItem._id,
                            }
                        ],
                    })
                }
            })
        } else {
            removeFromWishlist(iItem._id, {
                onSuccess: (data) => {
                    setWishlist({
                        items: wishlist.items.filter(item => item._id !== iItem._id)
                    })
                }
            })
        }
    }

    const checkId = (itemId: string) => {
        // console.log(">>>>",wishlistReq.isSuccess, wishlist)
        return !!wishlist?.items.find(item => item.item._id === itemId)
    }

    return {
        updateAndGetWishlist,
        wishlist,
        setWishlist,
        toggleAddWishlist,
        checkId
    }

}