import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IPostNotId } from '../types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { postApi } from '../api/postApi';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    userId: yup.number().required(),
    title: yup
        .string()
        .required()
        .min(3, 'Length of title must large 3 characters'),
    body: yup
        .string()
        .required()
        .min(3, 'Length of body must large 3 characters'),
});

const AddPostForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IPostNotId>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation(postApi.addPost, {
        onSuccess: data => {
            toast.success('Add new post success');

            setTimeout(() => {
                navigate(-1);
            }, 1000);
        },
        onError: error => {
            toast.error('Add new post failed');
        },
    });

    const onSubmit = (e: IPostNotId) => {
        console.log(e);

        mutate(e);
        setValue('userId', 0);
        setValue('body', '');
        setValue('title', '');
    };

    return (
        <div className="flex_center_column p-4 rounded-md shadow-xl border-[#ECECEC] ">
            <h2 className="text-center my-4 font-bold uppercase">Add Form</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-start">
                    <label htmlFor="title" className="form_label">
                        Title
                    </label>
                    <motion.input
                        type="text"
                        id="title"
                        placeholder="Title"
                        className="form_input"
                        whileFocus={{
                            boxShadow: '0px 0px 8px rgba(0,0,0)',
                        }}
                        {...register('title')}
                    />
                    {errors.title && (
                        <p className="form_error">{errors.title.message}</p>
                    )}
                </div>

                <div className="my-4 flex flex-col items-start">
                    <label htmlFor="body" className="form_label">
                        Body
                    </label>
                    <motion.input
                        id="body"
                        placeholder="body"
                        className="form_input"
                        whileFocus={{
                            boxShadow: '0px 0px 8px rgba(0,0,0)',
                        }}
                        {...register('body')}
                    />
                    {errors.body && (
                        <p className="form_error">{errors.body.message}</p>
                    )}
                </div>

                <div className="my-4 flex flex-col items-start">
                    <label htmlFor="userId" className="form_label">
                        UserId
                    </label>
                    <motion.input
                        type="number"
                        id="userId"
                        placeholder="User ID"
                        className="form_input"
                        whileFocus={{
                            boxShadow: '0px 0px 8px rgba(0,0,0)',
                        }}
                        {...register('userId')}
                        min="0"
                        defaultValue="0"
                    />
                    {/* {errors.userId && toast.error(errors.userId.message)} */}
                </div>

                <button className="w-full bg-black font-bold rounded-sm p-2 text-white transition-all hover:bg-blue-500">
                    Add Post
                </button>
            </form>
        </div>
    );
};

export default AddPostForm;
