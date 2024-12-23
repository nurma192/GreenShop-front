import {useSearchParams} from "react-router-dom";
import { RangeValue} from "@nextui-org/react";
import {DateValue} from "@internationalized/date";
import {PageType} from "../models/PageTypes";

export const useCustomParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    function getQueryFromParam(): string {
        const query = searchParams.get('query');
        return query ? query : '';
    }

    function getPageFromParam(): number {
        const page = Number(searchParams.get("page"));
        return page ? page : 1;
    }

    function setPageToParam(page: number) {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('page', page.toString());
        setSearchParams(currentParams);
    }

    function getTypeFromParam(): PageType {
        const type = searchParams.get("type");
        return (type === 'all' || type === 'new' ) ? type : 'all';
    }

    function setTypeToParam(type: ('lost' | 'found')) {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('type', type);
        setSearchParams(currentParams);
    }

    function setQueryToParam(query: string) {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('query', query.toString());
        setSearchParams(currentParams);
    }

    function getCategoryFromParam(): string {
        const category = searchParams.get("category");
        return category ? category : '';
    }

    const setCategoryToParam = (id: string | null) => {
        const currentParams = new URLSearchParams(searchParams);

        if (id === null || currentParams.get("category") === id) {
            currentParams.delete("category");
        } else {
            currentParams.set("category", id);
        }

        setSearchParams(currentParams);
    }

    function getSizeFromParam(): string {
        const size = searchParams.get("size");
        return size ? size : '';
    }

    const setSizeToParam = (id: string | null) => {
        const currentParams = new URLSearchParams(searchParams);

        if (id === null || currentParams.get("size") === id) {
            currentParams.delete("size");
        } else {
            currentParams.set("size", id);
        }

        setSearchParams(currentParams);
    }

    const setDateRangeToParam = (dateRange: RangeValue<DateValue>) => {
        const currentParams = new URLSearchParams(searchParams);
        const startDate = `${dateRange.start.year}-${String(dateRange.start.month).padStart(2, '0')}-${String(dateRange.start.day).padStart(2, '0')}`;
        const endDate = `${dateRange.end.year}-${String(dateRange.end.month).padStart(2, '0')}-${String(dateRange.end.day).padStart(2, '0')}`;
        currentParams.set('startDate', startDate);
        currentParams.set('endDate', endDate);
        setSearchParams(currentParams);
    }

    const getStartDateFromParam = (): string => {
        const startDate = searchParams.get('startDate');
        return startDate ? startDate : '';
    }
    const setStartDateToParam = (date: DateValue) => {
        const currentParams = new URLSearchParams(searchParams);
        const startDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        currentParams.set('startDate', startDate);
        setSearchParams(currentParams);
    }
    const getEndDateFromParam = (): string => {
        const endDate = searchParams.get('endDate');
        return endDate ? endDate : '';
    }
    const setEndDateToParam = (date: DateValue) => {
        const currentParams = new URLSearchParams(searchParams);
        const endDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        currentParams.set('endDate', endDate);
        setSearchParams(currentParams);
    }
    const getSortTypeFromParam = (): ('price-desc' | 'price-asc' | 'new-arrivals') => {
        const sortType = searchParams.get('sort');
        if(sortType === 'price-desc' || sortType === 'price-asc' || sortType === 'new-arrivals') {
            return sortType
        }
        return 'new-arrivals'
    }
    const setSortTypeToParam = (sortType: ('price-desc' | 'price-asc' | 'new-arrivals')) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('sort', sortType);
        setSearchParams(currentParams);
    }

    const getPriceRangeFromParam = () => {
        const min = Number(searchParams.get("minPrice")) || 1;
        const max = Number(searchParams.get("maxPrice")) || 1000; // Default 300
        return [min, max];
    };

    const setPriceRangeToParam = (value: [number, number]) => {
        searchParams.set("minPrice", String(value[0]));
        searchParams.set("maxPrice", String(value[1]));
        setSearchParams(searchParams);
    };

    const resetAllParams = () => {
        setSearchParams({
            type: "all",
            "sortBy": "price-desc"
        });
    };

    return {
        searchParams,
        getCategoryFromParam,
        getQueryFromParam,
        getPageFromParam,
        setSearchParams,
        setPageToParam,
        setCategoryToParam,
        setQueryToParam,
        resetAllParams,
        getTypeFromParam,
        setTypeToParam,
        getStartDateFromParam,
        setStartDateToParam,
        getEndDateFromParam,
        setEndDateToParam,
        setDateRangeToParam,
        getSortTypeFromParam,
        setSortTypeToParam,
        getSizeFromParam,
        setSizeToParam,
        getPriceRangeFromParam,
        setPriceRangeToParam,
    }
}