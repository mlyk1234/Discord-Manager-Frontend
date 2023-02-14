import { useEffect } from 'react';
import { BASE_URL } from './../../index';
import axios from "axios"
import { useState } from 'react';

export const useGetPrice = () => {
    const [price, setPrice] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    useEffect(() => {
        async function fn() {
            const res = await getPrice();
            res.data.data ? setPrice(res.data.data) : setPrice(0);
        }
        fn();
    }, [])

    const refetch = async () => {
        const res = await getPrice();
        if(res.data.data) {
            setPrice(res.data.data);
            setTimeout(() => {
                setIsLoaded(false);
            }, 1500);
            
        } else {
            setPrice(0);
        }
    }

    return { price, isLoaded, setIsLoaded, refetch };
}

const getPrice = async () => {

    return await axios.get(`${BASE_URL}/api/v1/price-feed/get-price`);
}