import React from 'react';
import {useCustomParams} from "../hooks/useCustomParams";

function SizesList() {
    const customParams = useCustomParams()
    const sizes = [{
        name: 'Small',
        key: 'S',
    }, {
        name: 'Medium',
        key: 'M',
    }, {
        name: 'Large',
        key: 'L',
    }, {
        name: 'Extra Large',
        key: 'XL',
    }];

    const changeCategory = (size: string) => {
        const currentParams = new URLSearchParams(customParams.searchParams);
        if (customParams.getSizeFromParam() === size) {
            currentParams.delete('size');
            currentParams.delete('page');
        } else {
            currentParams.set('size', size);
            currentParams.delete('page');
        }
        customParams.setSearchParams(currentParams);
    }

    return (
        <div className="flex flex-col">
            <h3 className="font-bold text-lg text-neutral-700">Categories</h3>
            <div className="flex flex-col justify-start gap-2 ml-4 mt-2">
                {sizes.map(size => (
                    <div
                        className={`cursor-pointer flex justify-between ${customParams.getSizeFromParam() === size.key && 'text-primary font-bold'}`}
                        onClick={() => changeCategory(size.key)}
                        key={size.key}>
                        <p>{size.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SizesList;
