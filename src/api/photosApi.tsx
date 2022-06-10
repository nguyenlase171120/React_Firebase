import { IParamsPagination, IPhotos } from '../types';
import axiosClient from './axiosClient';

export const photosApi = {
    getPhotosByPaging: (params: IParamsPagination) => {
        const url = '/photos';
        return axiosClient.get(url, {
            params: {
                _page: params._page,
                _limit: params._limit,
            },
        });
    },
};
