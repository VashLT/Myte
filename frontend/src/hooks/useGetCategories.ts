import axios from 'axios';
import React, { useState } from 'react';
import { mockCategories } from '../utils/mock';

export const useGetCategories = (): [boolean, string[]] => {
    const [data, setData] = useState<[] | string[]>([]);
    const [loading, setLoading] = useState(true);
    if (data.length > 0 || !loading) {
        return [loading, data]
    }

    axios.get("/api/categories")
        .then(res => {
            console.log("useGetCategories", { res })
            const data = (res as unknown as IresponseCategories).data;
            if ("error" in data) {
                setData([])
            }
            setData(data.categories as string[]);
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setData(mockCategories);
            setLoading(false)
        })

    return [loading, data]

}