import axios from 'axios';
import React, { useState } from 'react';

export const useGetTags = (): [boolean, string[]] => {
    const [data, setData] = useState<[] | string[]>([]);
    const [loading, setLoading] = useState(true);
    if (data.length > 0 || !loading) {
        return [loading, data]
    }

    axios.get("/api/tags")
        .then(res => {
            console.log("useGetTags", { res })
            const data = (res as unknown as IresponseTags).data;
            if ("error" in data) {
                setData([])
            }
            setData(data.tags as string[]);
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setData([]);
            setLoading(false)
        })

    return [loading, data]

}