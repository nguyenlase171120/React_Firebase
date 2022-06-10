import { AxiosRequestConfig } from 'axios';

export interface IUserProps {
    userName: string;
    userEmail: string;
    password: string;
}

export interface IUserRegister {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IUserLogin {
    email: string;
    password: string;
    remember: boolean;
    displayName: string;
}

export interface IParamsPagination {
    _page: number;
    _limit: number;
}

export interface IPhotos {
    id: number;
    title: string;
    url: string;
    // albumId: number;
    // thumbnailUrl: string;
}

export interface Iinital {
    loading: boolean;
    listPhotos: IPhotos[];
    currentUser: IUserLogin;
}

export interface AxiosResponse<T = never> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig<T>;
    request?: any;
}

export interface IPost {
    userId: number;
    id: number;
    body: string;
    title: string;
}

export interface IPostNotId {
    userId: number;
    body: string;
    title: string;
}
