import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Link2, Play } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { imagePath } from 'src/app/constants/Keys';
import { useGetKeywordsQuery } from 'src/app/services/slices/apiSlice';


interface RightProps {
    originalName?: string,
    status?: string,
    type?: string,
    originalLanguage?: string,
    networks?: string,
    budget?: number,
    revenue?: number
}
const RightSection: React.FC<RightProps> = ({ originalName, status, type, originalLanguage, networks, budget, revenue }) => {
    const { category, type: id } = useParams() as { category: string; type: string };
    const { data: Keywords, isLoading } = useGetKeywordsQuery({ category, id }, { refetchOnMountOrArgChange: false, })

    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="lg:col-span-1 lg:col-start-4 bg-transparent p-4 rounded-md h-full">
            <div className='flex justify-start items-center bg-white gap-4'>
                {category === 'tv' ? (
                    <Link to={''} className="hover:cursor-pointer">
                        <Play className='w-10 h-10' />
                    </Link>
                ) : (
                    <Link to={''} className="hover:cursor-pointer">
                        <Instagram className='w-10 h-10' />
                    </Link>
                )}
                <span className='h-18'>|</span>
                <Link to={''} className="hover:cursor-pointer">
                    <Link2 className='w-10 h-10' />
                </Link>
            </div>
            <div className='flex flex-col mb-6 mt-6'>
                <p className='font-bold'>Status</p>
                <p className=''>{status}</p>
            </div>
            <div className='flex flex-col mb-6'>
                <p className='font-bold'>Original Language</p>
                <p className=''>{originalLanguage}</p>
            </div>
            {category === 'movie' ? (
                <>
                    <div className='flex flex-col mb-6'>
                        <p className='font-bold'>Budget</p>
                        <p className=''>{budget}</p>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <p className='font-bold'>Revenue</p>
                        <p className=''>{revenue}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex flex-col mb-6'>
                        <p className='font-bold'>Original Name</p>
                        <p className=''>{originalName}</p>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <p className='font-bold'>Type</p>
                        <p className=''>{type}</p>
                    </div>
                    <div className='flex flex-col mb-6'>
                        <p className='font-bold'>Network</p>
                        <img className='' src={`${imagePath}${networks}`} alt='logo' width={100} height={100}>{revenue}</img>
                    </div>
                </>
            )}
            <div className="flex flex-col mb-6">
                <p className="font-bold mb-3">Keywords</p>

                {(Keywords?.keywords?.length > 0 || Keywords?.results?.length > 0) ? (
                    <div className="flex flex-wrap gap-2">
                        {[
                            ...(Keywords?.keywords || []),
                            ...(Keywords?.results || [])
                        ].map((word: any) => (
                            <span
                                key={word?.id}
                                className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                            >
                                {word?.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No keywords available</p>
                )}
            </div>
        </div>

    )
}

export default RightSection