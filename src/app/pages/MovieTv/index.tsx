import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react'
import { useGetMovieAndTvCategoriesQuery } from 'src/app/services/slices/apiSlice';
import MovieList from '../Home/MovieList';
import Pagination from 'src/app/components/Pagination';

const MovieAndTv = () => {
    const { category = "movie", type = "popular" } = useParams();
    const [page, setPage] = useState(1)
    const { data: MovieAndTv, isLoading } = useGetMovieAndTvCategoriesQuery({ category, type, page }, { refetchOnMountOrArgChange: false, })
    // console.log(MovieAndTv, '=====datadatadatadatadatadata======');
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [type]);

    const formateType = (str: string) => str.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")

    const HandlePageClick = (event: any) => {
        setPage(event.selected + 1)
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="mt-20 px-10">
            <h3 className='pt-3 text-3xl font-semibold'>{category === "movie" ? `${formateType(type)} Movies` : `${formateType(type)} TV Shows`}</h3>
            <div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-8 pt-6'>
                <div className="lg:col-span-1 sm:col-span-1 bg-white">
                    <div className='flex justify-between p-3 shadow-2xl border rounded-xl text-xl font-semibold mb-3 bg-white'>
                        <p className=''>Sort</p>
                        <ChevronRight />
                    </div>
                    <div className='flex justify-between p-3 shadow-2xl border rounded-xl text-xl font-semibold mb-3 bg-white'>
                        <p className=''>Where To Watch</p>
                        <ChevronRight />
                    </div>
                    <div className='flex justify-between p-3 shadow-2xl border rounded-xl text-xl font-semibold mb-3 bg-white'>
                        <p className=''>Filters</p>
                        <ChevronRight />
                    </div>
                    <div className='flex justify-center p-3 shadow-2xl border rounded-full text-xl font-semibold mb-3 bg-gray-200'>
                        <button className=''>Search</button>
                    </div>

                </div>
                <div className="lg:col-span-3 sm:col-span-2 bg-white">
                    <MovieList
                        data={MovieAndTv?.results}
                        className="grid grid-cols-4 gap-4 sm:gap-6"
                    />
                    <Pagination pageCount={MovieAndTv?.total_pages} HandlePageClick={HandlePageClick} />
                </div>
            </div>
        </div>
    )
}

export default MovieAndTv;