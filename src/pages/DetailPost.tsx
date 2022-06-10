import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { postApi } from '../api/postApi';
import { IPost } from '../types';

const DetailPost = () => {
    const { title } = useParams();
    const key = '/posts';
    const { data, isLoading } = useQuery({
        queryKey: key,
        queryFn: () => postApi.getAllPosts(key),
        staleTime: 30000,
    });
    return (
        <div>
            <h1 className="text-center bg-black text-white font-bold text-lg">
                Title of post: ${title}
            </h1>

            {isLoading ? (
                <p>Loading ...</p>
            ) : (
                data.map((item: IPost) => {
                    return <p key={item.id}>{item.title}</p>;
                })
            )}
        </div>
    );
};

export default DetailPost;
