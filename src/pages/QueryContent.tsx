import React, { useEffect, useState } from 'react';
import { useQuery, QueryClient, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postApi } from '../api/postApi';
import CardQuery from '../components/CardQuery';
import { IPost } from '../types';

const QueryContent = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(6);


    const queryClient = useQueryClient();
    const keys = queryClient.getQueryData('/posts/2'); 
    console.log(keys);




    const key = `/posts?_page=${page}&_limit=${limit}`;
    const { data, status, error } = useQuery<any, Error>({
        queryKey: key,
        queryFn: () => postApi.getPostsByPage(key),
        enabled: !!page && !!limit,
        staleTime: 30000,
    });

    if (status === 'loading') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        return <span>{toast.error(error.message)}</span>;
    }


    return (
        <div>
            <Link
                to="/addNew"
                className=" transition-all hover:bg-blue-500  bg-black text-white font-bold px-[8px] py-[12px] mt-4 mx-2 float-right rounded-md shadow-sm border-none outline-none cursor-pointer"
            >
                Add new{' '}
            </Link>
            <div className="grid grid-cols-3 mt-4 gap-4">
                {data.map((item: IPost) => {
                    return <CardQuery postInfo={item} />;
                })}
            </div>
        </div>
    );
};

export default QueryContent;
