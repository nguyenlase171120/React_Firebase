import { useEffect, useState } from 'react';
import { photosApi } from '../api/photosApi';

import { IPhotos } from '../types';
import ClockLoader from 'react-spinners/ClockLoader';
import Card from '../components/Card';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import { useSearchParams } from 'react-router-dom';
import AddPost from './AddPost';

const PhotosContent = () => {
    const [listPhotos, setListPhotos] = useState<IPhotos[]>([]);
    const [page, setPage] = useState<number>(1);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                _page: page,
                _limit: 15,
            };
            const result = await photosApi.getPhotosByPaging(params);
            result && setListPhotos(result.data);
        };

        fetchData();
    }, [page]);

    const handlePageClick = (event: { selected: number }): void => {
        const numberPage = event.selected + 1;
        setPage(numberPage);
        setSearchParams({ page: numberPage + '' });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className="my-4 flex justify-between ">
            <div className="flex_center_column w-[80%] ">
                <div className="grid grid-cols-3 gap-4 ">
                    {listPhotos.length > 1 ? (
                        listPhotos.map(item => {
                            return <Card itemDetail={item} key={item.id} />;
                        })
                    ) : (
                        <ClockLoader loading={true} size={40} />
                    )}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    pageRangeDisplayed={5}
                    pageCount={10}
                    onPageChange={handlePageClick}
                    previousLabel="< previous"
                    className="flex_center gap-4 border p-2 my-4"
                />
            </div>
            <Search />
        </div>

        // <AddPost />
    );
};

export default PhotosContent;
