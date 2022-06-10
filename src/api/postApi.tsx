import { IPost, IPostNotId } from '../types';
import axiosClient from './axiosClient';

export const postApi = {
    getPostsByPage: async (url: string) => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    getAllPosts: async (url: string) => {
        const res = await axiosClient.get(url);
        return res.data;
    },

    deletePostById: async (id: number) => {
        const url = `/posts/${id}`;
        const res = await axiosClient.delete(url);
        return res.data;
    },

    addPost: async (params: IPostNotId) => {
        const url = '/posts';
        const res = await axiosClient.post(url, {
            title: params.title,
            userId: params.userId,
            body: params.body,
        });

        return res.data;
    },

    updatePost: async (params: IPost) => {
        const url = `/posts/${params.id}`;

        const res = await axiosClient.put(url, {
            id: params.id,
            userId: params.userId,
            title: params.title,
            body: params.body,
        });
        return res.data;
    },

    getPostByID: async (url: string) => {
        const res = await axiosClient.get(url);
        return res.data;
    },
};
