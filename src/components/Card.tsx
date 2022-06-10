import { motion } from 'framer-motion';
import React from 'react';
import { IPhotos } from '../types';

interface ICard {
    itemDetail: IPhotos;
}

const Card: React.FC<ICard> = ({ itemDetail }) => {
    return (
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
        >
            <img src={itemDetail.url} alt="image" />

            <div className="flex items-start justify-center flex-col ">
                <p>{itemDetail.id}</p>
                <p>{itemDetail.title}</p>
            </div>
        </motion.div>
    );
};

export default Card;
