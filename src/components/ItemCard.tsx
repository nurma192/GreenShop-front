import {Skeleton} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Item} from "../models/Item";
import {FaAngleLeft, FaAngleRight, FaHeart} from "react-icons/fa";
import MyImage from "./ui/MyImage";
import {SlBasket} from "react-icons/sl";
import {useAddToWishlist} from "../api/addToWishlist";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {IUser} from "../models/IUser";
import {CiHeart} from "react-icons/ci";
import {useRemoveFromWishlist} from "../api/wishlist/removeFromWishlist";
import {useAddWishlist} from "../api/wishlist/addWishlistApi";
import {WishlistResponse} from "../models/WishlistResponse";

interface Props {
    item: Item;
    isMyItem?: boolean
    deleteButton?: boolean
    onDelete?: () => void
    wishlist?: WishlistResponse
}

function ItemCard({item, isMyItem = false, wishlist}: Props) {
    const [mainImage, setMainImage] = useState(0)
    const navigate = useNavigate();
    const user: IUser | null = useSelector((state: RootState) => state.user.user)
    const {mutate: removeFromWishlist, ...removeFromWishlistReq} = useRemoveFromWishlist()
    const {mutate: addToWishlist, ...addToWishlistReq} = useAddWishlist()


    const goToItemPage = () => {
        console.log(`Go to ${item.id}`)
        navigate(`/item/${item.id}`)
    }
    const handleButtonClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };
    const handleDeleteClick = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
    }
    const handleAddBasketClick = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
    };
    const handleLikeClick = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        addToWishlist(id)
    }
    return (
        <div
            className={`flex flex-col w-full h-full cursor-pointer rounded group hover:bg-neutral-100 transition p-2 max-w-[300px]`}
            onClick={() => {
                goToItemPage()
            }}>
            <div className="w-full h-full mb-8  flex justify-center items-center relative">
                <div className="relative w-full aspect-square">
                    {item.images.length > 0
                        ? <MyImage
                            className="w-full h-full object-cover z-0"
                            src={`${item.images[mainImage]}`}
                            alt="Item image"
                        /> : <img
                            className="w-full h-full object-cover z-0"
                            src={'/icons/addPhoto-scelet.svg'}
                            alt="Item image"
                        />
                    }
                </div>
                <div className="absolute top-0 right-0 bg-white bg-opacity-50 p-0.5 text-sm">
                    {item.images.length > 0 && `${mainImage + 1}/${item.images.length}`}
                </div>
                <button
                    className={`absolute m-auto cursor-pointer left-0 pr-2 py-2 rounded-r z-10 transition hover:scale-110 text-primary bg-white bg-opacity-50 disabled:opacity-0`}
                    onClick={(event) => {
                        handleButtonClick(event)
                        setMainImage(mainImage - 1)
                    }}
                    disabled={mainImage === 0 || item.images.length === 0}>
                    <FaAngleLeft/>
                </button>
                <button
                    className={`absolute m-auto cursor-pointer right-0 pl-2 py-2 rounded-s z-10 transition hover:scale-110 text-primary bg-white bg-opacity-50 disabled:opacity-0`}
                    onClick={(event) => {
                        handleButtonClick(event)
                        setMainImage(mainImage + 1)
                    }}
                    disabled={mainImage === item.images.length - 1 || item.images.length === 0}>
                    <FaAngleRight/>
                </button>

                {/*<div className="opacity-0 flex gap-2 transition absolute bottom-0 group-hover:opacity-100 mb-1">*/}
                {/*    <div*/}
                {/*        className="bg-[#fbfbfb] hover:bg-neutral-200 transition rounded-sm py-1 px-2 flex justify-center items-center"*/}
                {/*        onClick={(event) => {*/}
                {/*            handleAddBasketClick(item.id, event)*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <SlBasket className={`text-primary text-xl`}/>*/}
                {/*    </div>*/}
                {/*    <div*/}
                {/*        className="bg-[#fbfbfb] hover:bg-neutral-200 transition rounded-sm py-1 px-2 flex justify-center items-center"*/}
                {/*        onClick={(event) => {*/}
                {/*            handleLikeClick(item.id, event)*/}
                {/*        }}>{*/}
                {/*        <FaHeart className={`text-red-500 text-xl fill-red-500`}/>*/}
                {/*        // <CiHeart className={`text-red-500 text-xl fill-red-500`}/>*/}
                {/*    }</div>*/}
                {/*</div>*/}
            </div>
            <p className={`font-bold text-xl mt-auto`}>{item.title}</p>
            <p className={`font-semibold text-primary text-md mt-auto`}>${item.cost}.00</p>
            {isMyItem && <button
				className={`bg-red-600 mt-2 rounded text-white px-4 py-1 transition hover:bg-red-700 disabled:hidden`}
				onClick={(e) => {
                    handleDeleteClick(item.id, e)
                }}
			>Delete</button>}
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="w-full space-y-5 p-4 rounded-lg max-w-[300px]">
            <Skeleton className="rounded-lg">
                <div className="h-[200px] w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
            </div>
        </div>
    )
}

export {ItemCard, SkeletonCard};
