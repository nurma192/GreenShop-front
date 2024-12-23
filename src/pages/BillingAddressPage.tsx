import React, {useState} from 'react';
import {MyInput} from "../components/ui/MyInput";
import {Controller, useForm} from "react-hook-form";
import MyTextarea from "../components/ui/MyTextarea";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Basket} from "../models/basket";
import MyImage from "../components/ui/MyImage";
import {
    CircularProgress,
    cn, Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader,
    Radio,
    RadioGroup,
    Textarea, useDisclosure
} from "@nextui-org/react";
import MyButton from "../components/ui/MyButton";
import {MdDelete} from "react-icons/md";
import {UseRadioProps} from "@nextui-org/radio/dist/use-radio";
import {useAddShipping} from "../api/shiping/addShippingApi";
import {useAddOrder} from "../api/order/addOrder";
import {comment} from "postcss";
import {Order} from "../models/Order";
import {useClearBasket} from "../api/basket/clearBasket";
import {useNavigate} from "react-router-dom";

interface CreateAddressForm {
    firstName: string,
    lastName: string,
    country: string,
    town?: string,
    street: string,
    apartment: string,
    state?: string,
    zip: string,
    emailAddress: string,
    phoneNumber: string,
    comment?: string
    paymentMethod: string
}

interface Props {
    basket: Basket,
}

function BillingAddressPage({basket}: Props) {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user);
    const [submited, setSubmited] = useState(false)
    const [order, setOrder] = useState<Order| null>(null)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {handleSubmit, control, formState: {errors}} = useForm<CreateAddressForm>({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            emailAddress: user?.email,
            phoneNumber: user?.phoneNumber,
        }
    });

    const {mutate: addShipping, ...addShippingReq} = useAddShipping()
    const {mutate: addOrder, ...addOrderReq} = useAddOrder()
    const {mutate: clearBasket, ...clearBasketReq} = useClearBasket()


    const placeOrderClick = async (data: CreateAddressForm) => {
        if (!data.town) data.town = ""
        if (!data.state) data.state = ""
        if (!data.comment) data.comment = ""
        console.log(data)
        addShipping({
            name: `${data.firstName}`,
            firstName: data.firstName,
            lastName: data.lastName,
            country: data.country,
            town: data.town,
            street: data.street,
            apartment: data.apartment,
            state: data.state,
            zip: data.zip,
            emailAddress: data.emailAddress,
            phoneNumber: data.phoneNumber,
        }, {
            onSuccess: (data2) => {
                setSubmited(true)
                addOrder({
                    shippingAddressId: data2.address._id,
                    items: basket.items.map(item => ({item: item.item._id, quantity: item.quantity})),
                    orderNotes: data.comment!
                }, {
                    onSuccess: (data) => {
                        console.log(data.order)
                        setOrder(data.order)
                        onOpen()
                        clearBasket()
                    }
                })
            }
        })


    }
    return (
        <form onSubmit={handleSubmit(placeOrderClick)}>
            <div className={`flex `}>
                <div className="w-full md:w-[65%] mr-auto h-[300px]">
                    <h3>Billing Address</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <MyInput name={`firstName`}
                                 label={"First Name"}
                                 control={control}
                                 required={"First Name is required"}
                        />
                        <MyInput name={`lastName`}
                                 label={"Last Name"}
                                 control={control}
                                 required={"Last Name is required"}
                        />
                        <MyInput name={`country`}
                                 label={"Country"}
                                 control={control}
                                 required={"Country is required"}
                        />
                        <MyInput name={`town`}
                                 label={"Town"}
                                 control={control}
                        />
                        <MyInput name={`street`}
                                 label={"Street"}
                                 control={control}
                                 required={"Streets is required"}
                        />
                        <MyInput name={`apartment`}
                                 label={"Apartment"}
                                 control={control}
                                 required={"Apartment is required"}
                        />
                        <MyInput name={`state`}
                                 label={"State"}
                                 control={control}
                        />
                        <MyInput name={`zip`}
                                 label={"Zip"}
                                 control={control}
                                 required={"Zip is required"}
                        />
                        <MyInput name={`emailAddress`}
                                 label={"Email"}
                                 control={control}
                                 required={"Email is required"}
                        />
                        <MyInput name={`phoneNumber`}
                                 label={"Phone Number"}
                                 control={control}
                                 required={"Phone is required"}
                        />
                        <MyTextarea name={`comment`}
                                    label={"Comment"}
                                    control={control}
                        />
                    </div>
                </div>
                <div className={`w-[30%] max-w-[400px] flex flex-col`}>
                    <h2 className={`font-extrabold text-md`}>Your Order</h2>
                    <div className={`flex flex-col w-full gap-2`}>
                        {basket.items.map(item => (
                            <div key={item._id} className={`w-full flex justify-between bg-zinc-50 rounded-sm p-2`}>
                                <div className="w-full flex items-center justify-between gap-4">
                                    <div className="flex items-center">
                                        <MyImage src={item.item.images.length > 0 ? item.item.images[0] : ''}
                                                 className={`w-[70px] aspect-square`}/>
                                        <div className="flex flex-col">
                                            <h3 className={`text-xl text-text-color`}>{item.item.title}</h3>
                                            <h3 className={`text-[10px] text-text-color`}>
                                                <span>id: </span>{item.item._id}
                                            </h3>
                                        </div>
                                    </div>
                                    <h3 className={`whitespace-nowrap`}>(x {item.quantity})</h3>
                                    <h3 className={`text-primary font-extrabold`}>${item.item.cost * item.quantity}.00</h3>
                                </div>
                            </div>
                        ))}
                    </div>
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

                        <hr className="w-full h-[2px] my-4"/>

                        <div className="w-full flex flex-col">
                            <h2 className={`text-text-color font-extrabold`}>Payment Method</h2>
                            <Controller
                                name="paymentMethod"
                                control={control}
                                rules={{required: "Выберите способ оплаты"}}
                                render={({field}) => (
                                    <RadioGroup
                                        description="Some payment methods is coming soon"
                                        classNames={{base: "w-full"}}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        isInvalid={!!errors.paymentMethod}
                                    >
                                        <CustomRadio value="googlePay" isDisabled={true}>
                                            Google Pay
                                        </CustomRadio>
                                        <CustomRadio value="bank" isDisabled={true}>
                                            Bank transfer
                                        </CustomRadio>
                                        <CustomRadio value="nal">
                                            Cash on delivery
                                        </CustomRadio>
                                    </RadioGroup>
                                )}
                            />
                        </div>

                        <MyButton color={`primary`}
                                  className={`w-full py-2 mt-4`}
                                  type={`submit`}
                                  disabled={addShippingReq.isLoading || addOrderReq.isLoading || submited}
                        >Place Order {(addShippingReq.isLoading || addOrderReq.isLoading) &&
							<CircularProgress color={`secondary`} size={`sm`} classNames={{svg: "w-5 h-5"}}/>}
                        </MyButton>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} size={`lg`} onOpenChange={onOpenChange} classNames={{
                base: "rounded"
            }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className="w-full py-5 flex items-center flex-col gap-1 bg-primary bg-opacity-10 border-b border-b-primary border-opacity-30">
                                <img className={`size-16`} src="/icons/OrderVector.svg" alt=""/>
                                Your order has been received
                            </ModalHeader>
                            <ModalBody>
                                <div className="w-full justify-between flex items-center">
                                    <div className="flex flex-col items-start">
                                        <p className={`text-sm`}>Order Number</p>
                                        <p className={`text-[10px]`}>{order?._id}</p>
                                    </div>
                                    <div className="h-[30px] w-[1px] bg-primary bg-opacity-30"></div>
                                    <div className="flex flex-col items-start">
                                        <p className={`text-sm`}>Date</p>
                                        <p className={`text-md`}>
                                            {new Date(order?.createdAt!).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="h-[30px] w-[1px] bg-primary bg-opacity-30"></div>
                                    <div className="flex flex-col items-start">
                                        <p className={`text-sm`}>Total</p>
                                        <p className={`text-md`}>{order?.totalAmount}.00</p>
                                    </div>
                                    <div className="h-[30px] w-[1px] bg-primary bg-opacity-30"></div>
                                    <div className="flex flex-col items-start">
                                        <p className={`text-sm`}>Payment Method</p>
                                        <p className={`text-md`}>Cash on delivery</p>
                                    </div>
                                </div>
                                <div className="flex flex-col ">
                                    <div className={`flex flex-col w-full gap-2`}>
                                        {basket.items.map(item => (
                                            <div key={item._id}
                                                 className={`w-full flex justify-between bg-zinc-50 rounded-sm p-2`}>
                                                <div className="w-full flex items-center justify-between gap-4">
                                                    <div className="flex items-center">
                                                        <MyImage
                                                            src={item.item.images.length > 0 ? item.item.images[0] : ''}
                                                            className={`w-[70px] aspect-square`}/>
                                                        <div className="flex flex-col">
                                                            <h3 className={`text-xl text-text-color`}>{item.item.title}</h3>
                                                            <h3 className={`text-[10px] text-text-color`}>
                                                                <span>id: </span>{item.item._id}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <h3>(x {item.quantity})</h3>
                                                    <h3 className={`text-primary font-extrabold`}>${item.item.cost * item.quantity}.00</h3>
                                                </div>
                                            </div>
                                        ))}
                                        <hr className="w-full h-[2px] my-1"/>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex w-full justify-between">
                                                <p className={`text-text-color text-sm`}>Shipping</p>
                                                <p className={`font-extrabold`}><span
                                                    className={`text-primary`}>$</span>{
                                                    (basket?.items.length! * 10)
                                                }.00</p>
                                            </div>
                                        </div>

                                        <div className="flex w-full justify-between mb-5">
                                            <p className={`text-text-color font-extrabold text-md`}>Total</p>
                                            <p className={`font-extrabold`}><span className={`text-primary`}>$</span>{
                                                basket?.items.reduce((sum, item) => {
                                                    return sum + ((item.item.cost * item.quantity) || 0);
                                                }, 0)! + (basket?.items.length! * 10)!
                                            }.00</p>
                                        </div>

                                    </div>
                                    <p className={`text-text-color text-[12px] text-center`}>Your order is currently
                                        being processed. You will receive an order confirmation email shortly with the
                                        expected delivery date for your items.</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <MyButton color="primary" className={`py-1 px-4`} onClick={() => {
                                    onClose()
                                    navigate('/')
                                }}>
                                    Good :)
                                </MyButton>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </form>
    );
}

interface CustomRadioProps extends UseRadioProps {
    children: React.ReactNode;
}

export const CustomRadio = ({children, ...props}: CustomRadioProps) => {
    return (
        <Radio
            {...props}
            classNames={{
                base: cn(
                    "inline-flex w-full m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-md gap-4 p-4 border-1 ",
                    "data-[selected=true]:border-primary",
                ),
            }}
        >
            {children}
        </Radio>
    );
};

export default BillingAddressPage;
