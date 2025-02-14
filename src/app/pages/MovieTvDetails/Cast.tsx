import React from 'react';
import { imagePath } from 'src/app/constants/Keys';
import { Link } from 'react-router-dom';


interface MovieProps {
    imageUrl: any,
    title: string,
    id:number
}
const Cast: React.FC<MovieProps> = ({ imageUrl, title,id }) => {
    return (
        <Link to={`/people/popular/${id}`}>
            <div className='relative w-28 sm:w-40'>
                <img
                    width={60}
                    height={60}
                    src={`${imagePath}${imageUrl}`}
                    alt='movie images'
                    className='rounded-md w-full h-auto'
                />
            </div>
            <div className='pt-2 flex flex-col justify-center'>
                <p className='font-bold text-sm sm:text-base hover:text-[#19596d]'>{title}</p>
            </div>
        </Link>
    )
}

export default Cast