import React from 'react';
import {useCategoriesData} from "../api/categoriesApi";
import {Skeleton} from "@nextui-org/react";
import {useCustomParams} from "../hooks/useCustomParams";


function CategoriesList() {
    const {data, error, isLoading, isFetching, isSuccess} = useCategoriesData();
    const customParams = useCustomParams()

    const changeCategory = (categoryId: string) => {
        const currentParams = new URLSearchParams(customParams.searchParams);
        if (customParams.getCategoryFromParam() === categoryId) {
            currentParams.delete('category');
            currentParams.delete('page');
        } else {
            currentParams.set('category', categoryId);
            currentParams.delete('page');
        }
        customParams.setSearchParams(currentParams);
    }


    return (
        <div className="flex flex-col">
            <h3 className="font-bold text-lg text-neutral-700">Categories</h3>
            <div className="flex flex-col justify-start gap-2 ml-4 mt-2">
                <>
                    {(isLoading || isFetching) &&
						<>
                            {Array.from({length: 4}).map((_, index) => (
                                <Skeleton key={index} className="rounded-lg">
                                    <div className="h-8 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            ))}
						</>
                    }
                    {error && <h3>Error when get Categories</h3>}
                    {isSuccess && !isFetching && data.categories.map(category => (
                        <div
                            className={`cursor-pointer flex justify-between ${customParams.getCategoryFromParam() === category.id && 'text-primary font-bold'}`}
                            onClick={() => changeCategory(category.id)}
                            key={category.id}>
                            <p>{category.name}</p>
                        </div>
                    ))}
                </>
            </div>
        </div>
    );
}

export default CategoriesList;
