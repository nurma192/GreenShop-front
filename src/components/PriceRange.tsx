import React, {useEffect, useState} from 'react';
import {Slider, SliderValue} from "@nextui-org/react";
import {useCustomParams} from "../hooks/useCustomParams";

function PriceRange() {
    const {getPriceRangeFromParam, setPriceRangeToParam} = useCustomParams()
    const defaultValue: number[] = (getPriceRangeFromParam());
    const [value, setValue] = useState<SliderValue>(defaultValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setPriceRangeToParam(value as [number, number]);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);
    return (
        <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
            <h3 className={`font-bold text-neutral-700 text-lg`}>Price Range</h3>
            <Slider
                className="max-w-md"
                formatOptions={{style: "currency", currency: "USD"}}
                maxValue={1000}
                minValue={1}
                defaultValue={[0, 1000]}
                step={10}
                value={value}
                onChange={setValue}
            />
            <p className="text-default-500 font-medium text-small">
                Price: <span
                className={`text-primary font-bold`}>{Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}</span>
            </p>
        </div>
    );
}

export default PriceRange;
