import React from 'react';
import {useRemoveFromBasket} from "../api/basket/removeFromBasketApi";
import MyImage from "../components/ui/MyImage";
import {
    CircularProgress,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import MyButton from "../components/ui/MyButton";
import {MdDelete} from "react-icons/md";
import {Basket} from "../models/basket";
import {TbMoodEmpty} from "react-icons/tb";

interface Props {
    basket: Basket,
    setBasket: (basket: Basket) => void,
    changePageState: () => void
}
function BasketReviewPage({basket, setBasket, changePageState}:Props) {
    const {mutate: deleteFromBasket, ...deleteFromBasketReq} = useRemoveFromBasket()

    const handleDeleteClicked = (itemId: string) => {
        deleteFromBasket(itemId, {
            onSuccess: () => {
                if (!!basket) {
                    setBasket({
                        ...basket,
                        items: [
                            ...basket.items.filter(item => item.item._id !== itemId)
                        ]
                    })
                }
            }
        })
    }



    return (
        <div className="w-full flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-[65%] mr-auto h-[300px]">
                {!!basket && <div className={`flex flex-col w-full gap-2`}>
                    {basket.items.length === 0 && <div className={`w-full flex flex-col items-center text-center mt-5`}>Your basket is empty :( <TbMoodEmpty className={`size-10
                    `}/></div>}
                    {basket.items.map(item => (
                        <div key={item._id} className={`w-full flex justify-between bg-zinc-50 rounded-sm p-2`}>
                            <div className="w-full flex items-center justify-around gap-4">
                                <div className="flex gap-2 items-center">
                                    <MyImage src={item.item.images.length > 0 ? item.item.images[0] : ''}
                                             className={`w-[70px] aspect-square`}/>
                                    <div className="flex flex-col">
                                        <h3 className={`text-xl text-text-color`}>{item.item.title}</h3>
                                        <h3 className={`text-[10px] text-text-color`}><span>SKU: </span>{item.item.sku}
                                        </h3>
                                    </div>
                                </div>
                                <h3 className={`font-extrabold`}>${item.item.cost}.00</h3>
                                <h3>{item.quantity}pcs</h3>
                                <h3 className={`text-primary font-extrabold`}>${item.item.cost * item.quantity}.00</h3>
                                {deleteFromBasketReq.isLoading ?
                                    <CircularProgress color={`primary`} size={`sm`} className={`text-sm`}/> :
                                    <MyButton icon={<MdDelete className={`text-xl`}/>}
                                              color={`danger`}
                                              className={`py-1 px-1 rounded-2xl`}
                                              onClick={() => handleDeleteClicked(item.item._id)}
                                              disabled={deleteFromBasketReq.isLoading}
                                    ></MyButton>}
                            </div>
                        </div>
                    ))}
				</div>}
            </div>
            <div className="md:w-[30%] bg-opacity-30 h-[300px]">
                <div className="flex flex-col">
                    <h3 className={`font-extrabold text-xl`}>Basket Totals</h3>
                    <hr className="w-full h-[2px] my-4"/>
                    <div className="flex flex-col gap-2">
                        <div className="flex w-full justify-between">
                            <p className={`text-text-color text-sm`}>Subtotal</p>
                            <p className={`font-extrabold`}><span className={`text-primary`}>$</span>{
                                basket?.items.reduce((sum, item) => {
                                    return sum + ((item.item.cost * item.quantity) || 0);
                                }, 0)
                            }.00</p>
                        </div>
                        <div className="flex w-full justify-between">
                            <p className={`text-text-color text-sm`}>Shiping</p>
                            <p className={`font-extrabold`}><span className={`text-primary`}>$</span>{
                                (basket?.items.length! * 10)
                            }.00</p>
                        </div>
                    </div>

                    <div className="flex w-full justify-between mt-5">
                        <p className={`text-text-color font-extrabold text-md`}>Total</p>
                        <p className={`font-extrabold`}><span className={`text-primary`}>$</span>{
                            basket?.items.reduce((sum, item) => {
                                return sum + ((item.item.cost * item.quantity) || 0);
                            }, 0)! + (basket?.items.length! * 10)!
                        }.00</p>
                    </div>

                    <MyButton color={`primary`}
                              className={`w-full py-2 mt-4`}
                              onClick={changePageState}
                    >Proceed To Checkout</MyButton>
                </div>
            </div>


        </div>
    );
}

export default BasketReviewPage;
