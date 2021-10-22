import React, { useEffect, useState } from 'react';
import { useGetTags } from '../../hooks/useGetTags';

export const TagContext = React.createContext({
    tags: [] as string[],
    addTag: (tag: string) => { },
    deleteTag: (tag: string) => { },
    loading: false
});

export const TagProvider: React.FC = ({ children }) => {
    const [loading, allTags] = useGetTags();
    const [tags, setTags] = useState<string[]>(allTags);
    const [didFetch, setDidFetch] = useState(false);

    const addTag = (tag: string) => {
        setTags([...tags, tag])
    }

    const deleteTag = (tag: string) => {
        setTags(tags.filter(currentTag => currentTag !== tag))
    }

    useEffect(() => {
        console.log("TagProvider useEffect")
        if (!loading && !didFetch) {
            console.log("TagProvider updating tags after fetch...")
            // update tags after retrieved them from backend
            setTags(allTags);
            setDidFetch(true)
        }
    }, [setTags, setDidFetch, allTags, didFetch, loading]);

    return (
        <TagContext.Provider value={{ tags, addTag, deleteTag, loading }}>
            {children}
        </TagContext.Provider>
    )
}

export default TagContext;