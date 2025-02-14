import React from 'react';
import { imagePath } from 'src/app/constants/Keys';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';

interface MovieProps {
    keys: number,
    imageUrl: any,
    createdAt: any,
    title: string,
    vote: number,
    media_type: string
}
const Movie: React.FC<MovieProps> = ({ keys, imageUrl, createdAt, title, vote, media_type }) => {
    const { category } = useParams();

    return (
        <Link to={`/details/${category ? category : media_type}/${keys}`}>
            <div className='relative w-48 sm:w-56'>
                <img
                    width={200}
                    height={200}
                    src={`${imagePath}${imageUrl}`}
                    alt='movie images'
                    className='rounded-md w-full h-auto'
                />
                {/* <span className="absolute top-[-4] left-[2rem] transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-950 text-white p-3 border-2 border-green-400 text-center">
                    {vote ? vote.toFixed(0) : "N/A"}*
                </span> */}
            </div>
            <div className='pt-8 flex flex-col justify-center'>
                <p className='font-bold text-sm sm:text-base hover:text-[#19596d]'>{title}</p>
                <p className='text-xs sm:text-sm'>{moment(createdAt).format('DD MMM YYYY')}</p>
            </div>
        </Link>
    )
}

export default Movie
