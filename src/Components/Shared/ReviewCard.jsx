import { Rating } from '@smastrom/react-rating';
import React from 'react';

const ReviewCard = ({ r }) => {
    return (
        <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
            <div className="grid justify-between p-4">
                <div className="flex space-x-4">
                    <div>
                        <img src={r.image} alt="" className="object-cover w-15 h-15 rounded-full dark:bg-gray-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl">{r.name}</h4>
                        <p className="text-xl font-bold text-yellow-600">Rated: {r.rating}</p>
                        <Rating
                            style={{ maxWidth: 140 }}
                            value={r.rating}
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-2 dark:text-yellow-700">



                </div>
            </div>
            <div className="p-4 space-y-2 text-xl dark:text-gray-600">
                <p>{r.feedback}</p>
            </div>
        </div>
    );
};

export default ReviewCard;