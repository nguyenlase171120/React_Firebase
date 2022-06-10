import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { MutationKey, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postApi } from '../api/postApi';
import DetailPost from '../pages/DetailPost';
import { IPost } from '../types';

interface IPostDetail {
    postInfo: IPost;
}

interface IDelete {
    id: number;
}

const CardQuery: React.FC<IPostDetail> = ({ postInfo }) => {
    const navigate = useNavigate();
    const handleDetail = (e: string) => {
        navigate(`/query-content/${postInfo.title}`);
    };
    const { mutate } = useMutation(postApi.deletePostById, {
        onSuccess: () => {
            toast.success('Delete success');
        },
        onError: () => {
            toast.error('Delete Failed');
        },
    });

    const handleDelete = (id: number) => {
        const result = window.confirm(
            'Are you really want to delete this post ?'
        );

        if (result) {
            mutate(id);
        }
    };

    return (
        <div className="flex_center_column">
            <motion.div
                className="p-4 flex_center_column w-[70%] flex-wrap border shadow-lg rounded-sm cursor-pointer "
                whileHover={{
                    scale: 1.1,
                    originX: 0,
                    boxShadow: '0px 0px 8px rgb(0,0,0)',
                }}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                }}
                onClick={() => handleDetail(postInfo.title)}
            >
                <img
                    src="https://images.unsplash.com/photo-1654652601971-bea236ac42be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="image"
                />

                <div className="flex items-start justify-center flex-col w-full">
                    <p>{postInfo.id}</p>
                    <p>{postInfo.title}</p>
                </div>
            </motion.div>

            <div className="flex items-center justify-between w-[30%] mt-4">
                <motion.button
                    className="text_center bg-blue-500 rounded-md  text-white font-semibold p-2"
                    whileHover={{
                        scale: 1.1,
                        originX: 0,
                        boxShadow: '0px 0px 8px rgb(19, 99, 223)',
                    }}
                    onClick={() => navigate(`/update/${postInfo.id}`)}
                >
                    Update
                </motion.button>
                <motion.button
                    className="text_center bg-red-600   rounded-md ml-4 text-white font-semibold p-2"
                    onClick={() => {
                        const result = window.confirm(
                            'Are you really want to delete this post ?'
                        );

                        if (result) {
                            mutate(postInfo.id);
                        }
                    }}
                    whileHover={{
                        scale: 1.1,
                        originX: 0,
                        boxShadow: '0px 0px 8px rgb(255, 24, 24)',
                    }}
                >
                    Delete
                </motion.button>
            </div>
        </div>
    );
};

export default CardQuery;
