import React, {useEffect} from 'react';
import { useGetAllItems} from "../api/getAllItemsApi";
import {SkeletonCard} from "./ItemCard";
import {useCustomParams} from "../hooks/useCustomParams";
import {Pagination} from "@nextui-org/react";
import ShowItemsGrid from "./ShowItemsGrid";
import {useWishlist} from "../hooks/useWishlist";

function Items() {
    const wishlists = useWishlist();
    const customParams = useCustomParams();
    const {data, error, isLoading, isSuccess, isFetching, refetch} = useGetAllItems()

    useEffect(() => {
        refetch().catch(error => {
            console.log(error);
        })
    }, [customParams.searchParams]);

    useEffect(() => {
        console.log(wishlists)
    }, [])
    if (isLoading || isFetching) {
        return <div className={`w-full flex justify-center`}>
            <div className="w-full max-w-[300px] xs:max-w-none grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 xl2:grid-cols-4 gap-8 mt-5">
                {Array.from({length: 16}).map((_, index) => (
                    <SkeletonCard key={index}/>
                ))}
            </div>
        </div>
    }
    if (error) return <h3>Error</h3>

    return (
        <div className={`flex flex-col items-center`}>
            {/*{isSuccess && data.data.length === 0 && <h3>No items on Here</h3>}*/}
            {isSuccess && <ShowItemsGrid items={data.data} />}
            {isSuccess && <Pagination showControls
			                          total={data.metadata.totalPages}
			                          initialPage={data.metadata.currentPage}
			                          onChange={(e) => {
                                          customParams.setPageToParam(e)
                                      }}/>}
        </div>
    )
        ;
}

export default Items;
