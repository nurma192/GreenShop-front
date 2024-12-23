import React, {useState} from 'react';
import {ItemCard} from "./ItemCard";
import {TbMoodEmpty} from "react-icons/tb";
import {Item} from "../models/Item";

type Props = {
    items: Item[],
    isMyItems?: boolean,
    updateUserData?: () => void,
}

function ShowItemsGrid({items, isMyItems = false, updateUserData}: Props) {
    const [showItems, setShowItems] = useState(items)
    if (items.length === 0) {
        return <div className={`w-full flex items-center gap-2 justify-center my-4`}>
            <TbMoodEmpty size={30}/>
        </div>
    }
    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 xl2:grid-cols-4 gap-8 mt-5">
            {showItems.map((item, index) => (
                <ItemCard item={item} key={item.id}/>
            ))}
        </div>
    );
}

export default ShowItemsGrid;
