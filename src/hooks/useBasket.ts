import {useEffect, useState} from "react";
import {Basket} from "../models/basket";
import {useGetBasket} from "../api/basket/getBasketApi";
import {useAddBasket} from "../api/basket/addBasketApi";
import {useRemoveFromBasket} from "../api/basket/removeFromBasketApi";
import {GetItemResponse} from "../models/response/GetItemResponse";

export const useBasket = () => {
    const [basket, setBasket] = useState<Basket | null>(null)
    const basketReq = useGetBasket()
    const {mutate: addToBasket, ...addBasketReq} = useAddBasket()
    const {mutate: removeFromBasket, ...removeFromBasketReq} = useRemoveFromBasket()

    useEffect(() => {
        if (basketReq.isSuccess) {
            setBasket(basketReq.data)
            console.log("wishlistReq.data", basketReq.data)
        }
    }, [basketReq.data, basketReq.isSuccess])

    const updateAndGetBasket = () => {
        basketReq.refetch().then(data => {
            console.log(data)
            if (data.data) {
                setBasket(data.data)
                return data.data
            }
            return basket
        }).finally(() => {
            return basket
        })
    }

    const getBasket = () => {
        return basket
    }

    const addBasket = async (iItem: GetItemResponse, quantity: number) => {
        if (addBasketReq.isLoading || addBasketReq.isError || removeFromBasketReq.isLoading || removeFromBasketReq.isError) {
            return
        }

        addToBasket({itemId: iItem._id, quantity: quantity.toString()}, {
            onSuccess: (data) => {
                console.log(data)
                if (basket) {
                    setBasket({
                        ...basket,
                        items: [
                            ...basket.items,
                            {
                                item: iItem,
                                quantity: quantity,
                                _id: iItem._id
                            }
                        ]
                    })
                }
            }
        })
    }

    return {
        basket,
        addBasket,
        getBasket
    }
}