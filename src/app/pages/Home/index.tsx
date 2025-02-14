/*eslint-disable prefer-const*/
import { lazy, Suspense, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieBanner from '../../../assets/images/MovieBanner.webp';
import { useGetPostsQuery, useGetMovieAndTvQuery, useGetWhatsPopularQuery } from 'src/app/services/slices/apiSlice';
const Section = lazy(() => import('./Sections'))
const MovieList = lazy(() => import('./MovieList'))

const Home = () => {
  const [categories, setCategories] = useState<any>({
    movies: "day",
    tvSeriesList: "on_the_air",
    freeToWatch: "movie",
  });


  const { data: moviesData, isLoading } = useGetPostsQuery(categories.movies, { refetchOnMountOrArgChange: false, })

  const { data: movieAndTvData } = useGetMovieAndTvQuery(categories.freeToWatch, { refetchOnMountOrArgChange: false, })

  const { data: tvSeriesData } = useGetWhatsPopularQuery(categories.tvSeriesList, { refetchOnMountOrArgChange: false, })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const movies = useMemo(() => {
    return moviesData?.results
      ? moviesData.results.map((movie: any) => ({ ...movie, media_type: "movie" }))
      : [];
  }, [moviesData]);


  const tvSeries = useMemo(() => {
    return tvSeriesData?.results
      ? tvSeriesData.results.map((tv: any) => ({ ...tv, media_type: "tv" }))
      : [];
  }, [tvSeriesData]);

  const movieAndTv = useMemo(() => {
    return movieAndTvData?.results
      ? movieAndTvData.results.map((item: any) => ({ ...item, media_type: categories.freeToWatch }))
      : [];
  }, [movieAndTvData, categories.freeToWatch]);

  if (isLoading) return <p>Loading...</p>;


  return (
    <>
      <section className="relative min-h-[calc(90vh-64px)] mt-16 w-full text-white">
        <img className='absolute inset-0 w-full h-full object-fill' src={MovieBanner} alt="Movie Banner" />

        <div className="absolute inset-0 h-full bg-black bg-opacity-50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">That's a</h2>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Wrap 2024</h2>
          <p className="text-lg md:text-xl mt-2 text-white">
            The best (and worst) of the year from TMDB.
          </p>
          <Link
            to="#"
            className="mt-3 inline-block bg-transparent border-2 text-white px-8 py-1 text-lg font-semibold rounded-full transition"
          >
            Check it out
          </Link>
        </div>
      </section>

      <section className='relative container mx-auto px-3'>
        <div className='flex flex-col'>
          {[
            {
              title: "Trending",
              obj: { day: "Today", week: "This weak" },
              categoryKey: "movies",
              data: movies,
            },
            {
              title: "TV SERIES LISTS",
              obj: { on_the_air: "On Air", airing_today: "Air Today", popular: "Popular", top_rated: "Top Rated" },
              categoryKey: "tvSeriesList",
              data: tvSeries,
            },
            {
              title: "Free To Watch",
              obj: { movie: "Movies", tv: "TV" },
              categoryKey: "freeToWatch",
              data: movieAndTv,
            },
          ].map(({ title, obj, categoryKey, data }, index) => (
            <Suspense key={index} fallback={<p>Loading Section...</p>}>
              <Section
                title={title}
                obj={obj}
                selectedKey={categories[categoryKey]}
                setCategories={(key: any) =>
                  setCategories((prev: any) => ({ ...prev, [categoryKey]: key }))
                }
              />
              <MovieList
                data={data}
                className="flex gap-4 sm:gap-6 overflow-x-auto py-4 scroll-smooth custom-scrollbar"
              />
            </Suspense>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home