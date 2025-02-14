import { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Tabs } from 'src/app/constants/Keys';
import { useParams } from 'react-router-dom';
import { useGetVideosQuery, useGetImagesQuery } from 'src/app/services/slices/apiSlice';
import { imagePath } from 'src/app/constants/Keys';

const MediaSection = () => {
    const { category, type } = useParams() as { category: string; type: string };
    const [tabs, setTabs] = useState('Most Popular')
    const { data: Videos } = useGetVideosQuery({ category, type }, { refetchOnMountOrArgChange: false, })
    const { data: Images } = useGetImagesQuery({ category, type }, { refetchOnMountOrArgChange: false, })

    return (
        <div className="pt-8 flex flex-col gap-4">
            <div className="flex items-center gap-6 border-b border-gray-300 pb-2">
                <p className="text-2xl font-bold text-black">Media</p>
                <ul className="flex gap-6">
                    {Tabs?.map((item: any, index: number) => (
                        <li
                            key={index}
                            className={`cursor-pointer text-gray-600 hover:text-black transition-all duration-200 pb-1 ${tabs === item ? 'text-black font-semibold border-b-2 border-black' : ''
                                }`}
                            onClick={() => setTabs(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {tabs === "Most Popular" ? (
                    <div
                        className={`flex rounded-md overflow-x-auto scroll-smooth custom-scrollbar`}
                    >
                        {Images?.posters?.map((image: any, index: number) => (
                            <div key={index} className=" ">
                                <div className="relative sm:w-[700px] w-[400px] sm:h-[400px] h-[300px]">
                                    <img
                                        src={`${imagePath}${image?.file_path}`}
                                        alt="movie images"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : tabs === "Videos" ? (
                    <div
                        className={`flex rounded-md overflow-x-auto scroll-smooth custom-scrollbar`}
                    >
                        {Videos?.results?.map((video: any, index: number) => (
                            <div key={index} className="">
                                <div className="relative sm:w-[700px] w-[400px] sm:h-[400px] h-[300px]">
                                    <ReactPlayer
                                        className="react-player"
                                        url={`https://www.youtube.com/watch?v=${video.key}`}
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : tabs === "Backdrops" ? (
                    <div
                        className={`flex rounded-md overflow-x-auto scroll-smooth custom-scrollbar`}
                    >
                        {Images?.backdrops?.map((image: any, index: number) => (
                            <div key={index} className="">
                                <div className="relative sm:w-[700px] w-[400px] sm:h-[400px] h-[300px]">
                                    <img
                                        src={`${imagePath}${image?.file_path}`}
                                        alt="movie images"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : tabs === "Posters" ? (
                    <div
                        className={`flex rounded-md overflow-x-auto scroll-smooth custom-scrollbar`}
                    >
                        {Images?.logos?.map((image: any, index: number) => (
                            <div key={index} className="">
                                <div className="relative sm:w-[700px] w-[400px] sm:h-[400px] h-[300px]">
                                    <img
                                        src={`${imagePath}${image?.file_path}`}
                                        alt="movie images"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default MediaSection