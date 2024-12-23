import React, {useEffect, useState} from 'react';
import {useGetUserOrders} from "../api/order/getUserOrders";
import MyImage from "../components/ui/MyImage";

export interface OrderResponse {
    orderId: string,
    totalAmount: number,
    shippingAddressName: string,
    items: {
        id: string,
        itemName: string,
        images: string[],
        sku: string,
        itemSize: string,
        quantity: number,
        itemCost: number,
        totalItemCost: number
    }[]
}

function MyOrdersPage() {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const {data, isLoading, isSuccess, error} = useGetUserOrders()

    useEffect(() => {
        if (isSuccess) {
            setOrders(data.orders)
        }
    }, [data, isSuccess]);

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 gap-2">
                {!!orders &&
                    orders.map((order) => (
                            <div className={'border border-neutral-200 rounded p-2'}>
                                <h3>orderID:{order.orderId}</h3>
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-full flex justify-between bg-zinc-50 rounded-sm p-2">
                                        <div className="w-full flex items-center justify-around gap-4">
                                            <div className="flex gap-2 items-center">
                                                <MyImage
                                                    src={item.images.length > 0 ? item.images[0] : ""}
                                                    className="w-[70px] aspect-square"
                                                />
                                                <div className="flex flex-col">
                                                    <h3 className="text-xl text-text-color">{item.itemName}</h3>
                                                    <h3 className="text-[10px] text-text-color">{item.itemSize}</h3>
                                                </div>
                                            </div>
                                            <h3 className="font-extrabold">${item.itemCost}.00</h3>
                                            <h3>{item.quantity}pcs</h3>
                                            <h3 className="text-primary font-extrabold">
                                                ${item.totalItemCost}
                                            </h3>

                                        </div>
                                    </div>
                                ))}
                                <div className="">
                                    <div className="flex gap-2">
                                        <h3>Total: <span
                                            className={'text-primary font-extrabold'}>${order.totalAmount}.00</span>
                                        </h3>
                                        <h3>Address Name: <span
                                            className={'text-primary font-extrabold'}>{order.shippingAddressName}</span>
                                        </h3>

                                    </div>
                                </div>
                            </div>
                        )
                    )}
            </div>
        </div>
    );
}

export default MyOrdersPage;
