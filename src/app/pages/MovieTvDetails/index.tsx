import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu, Heart, Bookmark, Play } from 'lucide-react';
import { useGetDetailsOfMovieAndTvQuery } from 'src/app/services/slices/apiSlice';
import moment from 'moment';
import { imagePath } from 'src/app/constants/Keys';
import MovieList from '../Home/MovieList';
import RightSection from './RightSection';
import { useGetStarCastQuery, useGetRecommendationQuery } from 'src/app/services/slices/apiSlice';
import CastList from './CastList';
import MediaSection from './MediaSection';

const MovieTvDetails = () => {
  const { category, type } = useParams() as { category: string; type: string };
  const { data: MovieAndTvDetail } = useGetDetailsOfMovieAndTvQuery({ category, type }, { refetchOnMountOrArgChange: false, })
  const { data: StarCast } = useGetStarCastQuery({ category, type }, { refetchOnMountOrArgChange: false, })
  const { data: Recommendations } = useGetRecommendationQuery({ category, type }, { refetchOnMountOrArgChange: false, })
   
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [type]);

  const runtime = useMemo(() => {
    return MovieAndTvDetail?.runtime ?? MovieAndTvDetail?.episode_run_time?.[0] ?? null;
  }, [MovieAndTvDetail]);

  const duration = useMemo(() => {
    return runtime ? moment.duration(runtime, "minutes") : null;
  }, [runtime]);

  const Details = useMemo(() => ({
    title: MovieAndTvDetail?.original_title || MovieAndTvDetail?.name || "Unknown",
    date: MovieAndTvDetail?.release_date || MovieAndTvDetail?.first_air_date
      ? moment(MovieAndTvDetail?.release_date ?? MovieAndTvDetail?.first_air_date).format("DD/MM/YY")
      : "N/A",
  }), [MovieAndTvDetail]);

  return (
    <>
      <section className="relative min-h-[calc(90vh-64px)] mt-16 w-full text-white">
        <img className="absolute inset-0 w-full h-full object-fill" src={`${imagePath}${MovieAndTvDetail?.backdrop_path}`} alt="Movie Banner" />
        <div className="absolute inset-0 h-full bg-black bg-opacity-70"></div>
        <div className="relative w-full mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8 py-4 px-4 place-items-start h-auto">
          <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 flex justify-center flex-col h-full">
            <img width={400} height={800} className="rounded-lg object-fill w-[400px] h-[500px]" src={`${imagePath}${MovieAndTvDetail?.poster_path}`} alt="Movie Poster" />
          </div>
          <div className="lg:col-span-3 md:col-span-2 sm:col-span-1 text-start md:text-left">
            <div className='pt-2'>
              <h2 className='text-3xl font-bold '>{Details?.title}</h2>
              <div className='flex gap-2 font-semibold items-center'>
                <p><span className='border'>R</span> {Details?.date} ({MovieAndTvDetail?.origin_country[0]})</p>
                {MovieAndTvDetail?.genres.map((item: any) =>
                  <Link to={''} key={item.id} className='underline hover:text-blue-300'>{item?.name}</Link>
                )}
                <span>{duration?.hours()}h {duration?.minutes()}m</span>
              </div>
            </div>
            <div className='pt-6 flex gap-4 items-center'>
              <span className='p-4 bg-blue-950 rounded-full'>{MovieAndTvDetail?.vote_average.toFixed(0) * 10}</span>
              <div>
                <p>User</p>
                <p>Score</p>
              </div>
              <button className='bg-blue-950 rounded-full p-3'>What's your Vibe?</button>
            </div>
            <div className="flex py-4 gap-8">
              <div className="relative group">
                <div
                  className="p-3 bg-blue-300 rounded-full hover:cursor-pointer"
                >
                  <Menu className="w-6 h-6 text-white" />
                </div>
                <span className="absolute top-full left-1/2 -translate-x-1/2 px-3 py-1 mt-1 text-xs text-white bg-gray-700 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Add to List
                </span>
              </div>

              <div className="relative group">
                <div
                  className="p-3 bg-blue-300 rounded-full hover:cursor-pointer"
                >
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="absolute top-full left-1/2 -translate-x-1/2 px-3 py-1 mt-1 text-xs text-white bg-gray-700 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Mark as favourite
                </span>
              </div>
              <div className="relative group">
                <div
                  className="p-3 bg-blue-300 rounded-full hover:cursor-pointer"
                >
                  <Bookmark className="w-6 h-6 text-white" />
                </div>
                <span className="absolute top-full left-1/2 -translate-x-1/2 px-3 py-1 mt-1 text-xs text-white bg-gray-700 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Add to your watchlist
                </span>
              </div>
              <div className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full text-white cursor-pointer hover:bg-red-600 transition">
                <Play className="w-6 h-6" />
                <p>Play Trailer</p>
              </div>
            </div>
            <div className='py-6'>
              <h3 className='text-xl font-semibold'>Overview</h3>
              <p className='py-4'>{MovieAndTvDetail?.overview}</p>
              <div className='flex gap-12'>
                <div>
                  <p>Christian Gudegast</p>
                  <span>Characters,</span>
                  <span>Director, </span>
                  <span> Writer</span>
                </div>
                <div>
                  <p>Paul T. Scheuring</p>
                  <span>Characters,</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative w-full mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 py-4 px-4">
        <div className="lg:col-span-3 md:col-span-2">
          <CastList
            title='Top Billed Cast'
            data={StarCast?.cast}
            className="flex gap-4 sm:gap-6 overflow-x-auto py-4 scroll-smooth custom-scrollbar"
          />
          <MediaSection />
          <div className='pt-4'>
            <p className='text-2xl font-bold text-black'>Recommendations</p>
            <MovieList
              data={Recommendations?.results}
              className='flex gap-4 sm:gap-6 overflow-x-auto py-4 scroll-smooth custom-scrollbar'
            />
          </div>
        </div>
        <div className='pt-20'>
          <RightSection
            originalName={MovieAndTvDetail?.original_name}
            status={MovieAndTvDetail?.status}
            type={MovieAndTvDetail?.type}
            originalLanguage={MovieAndTvDetail?.spoken_languages?.[0]?.english_name}
            networks={MovieAndTvDetail?.networks?.length ? MovieAndTvDetail.networks[0]?.logo_path : undefined}
            budget={MovieAndTvDetail?.budget}
            revenue={MovieAndTvDetail?.revenue}
          />
        </div>
      </div>
    </>
  )
}

export default MovieTvDetails