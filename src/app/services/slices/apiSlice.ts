import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ACCESS_TOKEN } from 'src/app/constants/Keys';
import { MovieTvDetailsParams,MovieTvCategoryParams } from 'src/app/constants/Interface';


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://api.themoviedb.org/3/",
      prepareHeaders: (headers, { getState }: { getState: any }) => {
        headers.set("Authorization", `Bearer ${ACCESS_TOKEN}`);
        headers.set("Content-Type", "application/json");
        return headers;
      },
    }),
    tagTypes: ["Trending"],
    endpoints: (builder) => ({
      getPosts: builder.query({
        query: (category) =>`trending/movie/${category}?language=en-US`,
        providesTags: ["Trending"],
        keepUnusedDataFor: 300,
      }),
      getMovieAndTv:builder.query({
        query:(category)=> `discover/${category}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
        keepUnusedDataFor: 300,
      }),
      getWhatsPopular:builder.query({
        query:(whatsPopular)=>`tv/${whatsPopular}?language=en-US&page=1`,
        keepUnusedDataFor: 300,
      }),
      getMovieAndTvCategories:builder.query({
        query:({category,type,page}:MovieTvCategoryParams)=>`${category}/${type}?language=en-US&page=${page}`,
        keepUnusedDataFor: 300,
      }),
      getDetailsOfMovieAndTv:builder.query({
        query:({category,type}:MovieTvDetailsParams)=>`${category}/${type}?language=en-US`,
        keepUnusedDataFor: 300,
      }),
      getKeywords:builder.query({
        query:({category,id}:{category:string,id:number|string})=>`${category}/${id}/keywords`,
        keepUnusedDataFor: 300,
      }),
      getStarCast:builder.query({
        query:({category,type}:MovieTvDetailsParams)=>`${category}/${type}/credits?language=en-US`,
        keepUnusedDataFor: 300,
      }),
      getVideos:builder.query({
        query:({category,type}:MovieTvDetailsParams)=>`${category}/${type}/videos`,
        keepUnusedDataFor: 300,
      }),
      getImages:builder.query({
        query:({category,type}:MovieTvDetailsParams)=>`${category}/${type}/images`,
        keepUnusedDataFor: 300,
      }),
      getRecommendation:builder.query({
        query:({category,type}:MovieTvDetailsParams)=>`${category}/${type}/recommendations?language=en-US&page=1`,
        keepUnusedDataFor: 300,
      }),
      getPopularPersons:builder.query({
        query:(page)=>`person/popular?language=en-US&page=${page}`,
        keepUnusedDataFor: 300,
      }),
      getPopularPersonDetails:builder.query({
        query:(id)=>`person/${id}?language=en-US`,
        keepUnusedDataFor: 300,
      }),
      getKnowFor:builder.query({
        query:(id)=>`person/${id}/combined_credits?language=en-US`,
        keepUnusedDataFor: 300,
      })
    }),
  });
  
  export const {
    useGetPostsQuery,
    useGetMovieAndTvQuery,
    useGetWhatsPopularQuery,
    useGetMovieAndTvCategoriesQuery,
    useGetDetailsOfMovieAndTvQuery,
    useGetKeywordsQuery,
    useGetStarCastQuery,
    useGetVideosQuery,
    useGetImagesQuery,
    useGetRecommendationQuery,
    useGetPopularPersonsQuery,
    useGetPopularPersonDetailsQuery,
    useGetKnowForQuery
  } = apiSlice;
  