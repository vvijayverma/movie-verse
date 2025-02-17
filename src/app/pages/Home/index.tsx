/*eslint-disable prefer-const*/
import { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import MovieBanner from '../../../assets/images/MovieBanner.webp';
import {
  useGetPostsQuery,
  useGetMovieAndTvQuery,
  useGetWhatsPopularQuery,
  useGetSearchMovieTvQuery
} from 'src/app/services/slices/apiSlice';
import debounce from 'lodash.debounce'

const Section = lazy(() => import('./Sections'))
const MovieList = lazy(() => import('./MovieList'))

const Home = () => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<any>({
    movies: "day",
    tvSeriesList: "on_the_air",
    freeToWatch: "movie",
  });

  const { data: moviesData, isLoading } = useGetPostsQuery(categories.movies, { refetchOnMountOrArgChange: false, })

  const { data: movieAndTvData } = useGetMovieAndTvQuery(categories.freeToWatch, { refetchOnMountOrArgChange: false, })

  const { data: tvSeriesData } = useGetWhatsPopularQuery(categories.tvSeriesList, { refetchOnMountOrArgChange: false, })

  const { data: searchResults, refetch: fetchSearchResults } = useGetSearchMovieTvQuery(query, {
    skip: query.length < 2,
  });

  const debouncedSearch = useMemo(() => debounce(fetchSearchResults, 500), []);

  useEffect(() => {
    if (query.length > 1) {
      debouncedSearch();
    }
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

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
      <section className="relative min-h-screen w-full text-white flex flex-col items-center justify-center">
        <img className="absolute inset-0 w-full h-full object-cover" src={MovieBanner} alt="Movie Banner" />
        <div className="absolute inset-0 h-full bg-black bg-opacity-50"></div>

        <div className="relative w-full max-w-2xl bg-[#19596d] p-4 rounded-lg shadow-xl z-20">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for a movie..."
              className="w-full p-3 rounded-lg bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="absolute right-3 text-gray-500 hover:text-black"
                onClick={() => setQuery("")}
              >
                <X />
              </button>
            )}
          </div>

          {query.length > 1 && searchResults?.results?.length > 0 && (
            <div className="absolute left-0 w-full mt-2 bg-gray-900 rounded-lg shadow-lg max-h-60 overflow-y-auto z-30">
              {searchResults.results.map((movie: any) => (
                <Link
                  to={
                    movie.media_type === "person"
                      ? `people/popular/${movie.id}`
                      : `/details/${movie.media_type}/${movie.id}`
                  }
                  key={movie.id}
                  className="block"
                >
                  <div className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path || movie.profile_path}`}
                      alt={movie.original_title || movie.original_name}
                      className="w-12 h-16 rounded-md mr-3"
                    />
                    <p className="text-white">{movie.original_title || movie.original_name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="relative text-center mt-6">
          <h2 className="text-4xl md:text-5xl font-bold">That's a</h2>
          <h2 className="text-4xl md:text-5xl font-bold">Wrap 2024</h2>
          <p className="text-lg md:text-xl mt-2">The best (and worst) of the year from TMDB.</p>
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