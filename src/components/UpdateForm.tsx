import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, QueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IPost } from '../types';
import { motion } from 'framer-motion';
import { postApi } from '../api/postApi';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    id: yup.number().required(),
    userId: yup.number().required(),
    body: yup.string().required(),
    title: yup.string().required(),
});

const UpdateForm = () => {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPost>({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    const queryClient = new QueryClient();
    queryClient.setQueryData('keysNe', { k1: 'k1', k2: '' });

    const keys = queryClient.getQueryData('/posts/2');
    console.log(keys);

    const key = `/posts/${id}`;
    const { isFetching, data, error, status } = useQuery({
        queryKey: key,
        queryFn: () => postApi.getPostByID(key),
        staleTime: 30000,

        onSettled: () => queryClient.invalidateQueries(),
    });

    const { mutate } = useMutation(postApi.updatePost, {
        onSuccess: data => {
            toast.success('Update post success');
            setTimeout(() => {
                navigate(-1);
            }, 1000);
        },

        onError: data => {
            toast.error('Update post failed');
        },
    });

    const onSubmit = (e: IPost) => {
        mutate(e);
    };

    if (status === 'loading') {
        return <p>Loading....</p>;
    }

    return (
        <div className="rounded-md shadow-lg p-4 flex_center_column mt-4 ">
            <h2 className="my-2 text-lg ">Update Form</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-start my-2">
                    <label htmlFor="id" className="form_label">
                        Id
                    </label>
                    <input
                        type="number"
                        id="id"
                        placeholder="id"
                        className="form_input"
                        {...register('id')}
                        defaultValue={data.id}
                    />
                    {errors.id && (
                        <p className="form_error">{errors.id.message}</p>
                    )}
                </div>

                <div className="flex flex-col items-start my-2">
                    <label htmlFor="id" className="form_label">
                        UseId
                    </label>
                    <input
                        type="number"
                        id="userId"
                        placeholder="userId"
                        className="form_input"
                        {...register('userId')}
                        defaultValue={data.userId}
                    />

                    {errors.userId && (
                        <p className="form_error">{errors.userId.message}</p>
                    )}
                </div>

                <div className="flex flex-col items-start my-2">
                    <label htmlFor="id" className="form_label">
                        Body
                    </label>
                    <input
                        type="text"
                        id="body"
                        placeholder="id"
                        className="form_input"
                        {...register('body')}
                        defaultValue={data.body}
                    />
                    {errors.body && (
                        <p className="form_error">{errors.body.message}</p>
                    )}
                </div>

                <div className="flex flex-col items-start my-2">
                    <label htmlFor="id" className="form_label">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="id"
                        className="form_input"
                        {...register('title')}
                        defaultValue={data.title}
                    />
                    {errors.title && (
                        <p className="form_error">{errors.title.message}</p>
                    )}
                </div>

                <button className="btn_submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;
