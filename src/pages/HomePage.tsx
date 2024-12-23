import React, {useEffect, useState} from 'react';
import CategoriesList from "../components/CategoriesList";
import {useCustomParams} from "../hooks/useCustomParams";
import {
    Select,
    SelectItem
} from "@nextui-org/react";
import {PageType} from "../models/PageTypes";
import Items from "../components/Items";
import PriceRange from "../components/PriceRange";
import SizesList from "../components/SizesPage";


function HomePage() {
    const customParams = useCustomParams();
    const [subPage, setSubPage] = useState<PageType>(customParams.getTypeFromParam());

    const handleSetSubPage = (pageName: PageType) => {
        const currentParams = new URLSearchParams(customParams.searchParams);
        currentParams.set('type', pageName);
        currentParams.delete('category');
        currentParams.delete('page');
        customParams.setSearchParams(currentParams);
        setSubPage(pageName);
    };

    const sorts = [
        {label: "Price Up", key: "price-asc"},
        {label: "Price Down", key: "price-desc"},
    ]
    const [value, setValue] = useState<'price-desc' | 'price-asc'>("price-asc");

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'price-asc' || e.target.value === 'price-desc') {
            setValue(e.target.value);
            customParams.setSortTypeToParam(e.target.value);
        }
    };


    return (
        <>
            <div className="w-full flex items-start">
                <div className="w-1/5 px-5 hidden md:flex flex-col gap-6 min-w-[300px]">
                    <CategoriesList/>
                    <PriceRange />
                    <SizesList />
                </div>
                <div className="w-full md:w-4/5 md:pl-8 flex flex-col">
                    <div className="flex justify-between">
                        <div className="flex w-full gap-2 justify-center md:justify-start">
                            <div className="flex gap-2">
                                <button className="px-2 py-2 " onClick={() => handleSetSubPage("all")}>
                                    <h3 className={`border-b-3 flex items-center gap-1 px-1 ${subPage === 'all' ? 'border-primary text-primary font-bold' : 'border-white'}`}>
                                        All Plants
                                    </h3>
                                </button>
                                <button className="px-2 py-2" onClick={() => handleSetSubPage("new")}>
                                    <h3 className={`border-b-3 flex items-center gap-1 px-1 ${subPage === 'new' ? 'border-primary text-primary font-bold' : 'border-white'}`}>
                                        New Arrivals
                                    </h3>
                                </button>
                            </div>
                            <div className="w-[30px] h-[30px] bg-primary opacity-30s rounded-xl md:hidden"></div>
                        </div>
                        <div className={`gap-2 md:flex`}>
                            <div className={`w-60 ${subPage === 'new' ? 'hidden' : ''}`}>
                                <Select
                                    items={sorts}
                                    placeholder="Select sorting"
                                    selectedKeys={[value]}
                                    onChange={handleSelectionChange}
                                >
                                    {(sort) => <SelectItem key={sort.key}>{sort.label}</SelectItem>}
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                    <Items/>
                    </div>

                </div>
            </div>
        </>
    );
}

export default HomePage;
