import React, {useEffect, useState} from 'react';
import api from "../api/Api";
import {Basket} from "../models/basket";
import BasketReviewPage from "./BasketReviewPage";
import BillingAddressPage from "./BillingAddressPage";

type BasketPageState = 'view' | 'createAddress'

function BasketPage() {
    const [pageState, setPageState] = useState<BasketPageState>('view')
    const [basket, setBasket] = useState<Basket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        api.get('/baskets')
            .then((response) => {
                setBasket(response.data.basket);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load basket data.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return(
        <div className={`w-full`}>
            {basket && pageState === 'view' && <BasketReviewPage basket={basket} setBasket={setBasket} changePageState={() => setPageState('createAddress')} />}
            {basket && pageState === 'createAddress' && <BillingAddressPage basket={basket} />}
        </div>
    )
}

export default BasketPage;
