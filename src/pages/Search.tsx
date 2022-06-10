import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Search() {
    const [key, setKey] = useState<string>('');
    const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const keyValue = e.target.value;
        setKey(keyValue);

        if (searchRef.current) {
            clearTimeout(searchRef.current);
        }

        searchRef.current = setTimeout(() => {
            handleSubmit(keyValue);
        }, 1000);
    };

    const handleSubmit = (e: string) => {
        setSearchParams({ q: e });
        console.log(e);
    };

    return (
        <div className="flex_center_column  mr-2 h-full">
            <h2 className="font-bold mt-2 uppercase tracking-widest">
                Search page
            </h2>
            <form>
                <motion.input
                    type="search"
                    placeholder="Search"
                    className="p-2 my-2 border"
                    whileFocus={{
                        boxShadow: '0px 0px 8px rgb(0, 0, 0)',
                    }}
                    onChange={handleSearchChange}
                />
                <button className="px-4 py-2 ml-2 rounded-md bg-black text-white transition-all hover:bg-[#764AF1] font-bold text-lg">
                    Search
                </button>
            </form>
        </div>
    );
}

export default Search;
