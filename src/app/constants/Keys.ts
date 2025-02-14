export const imagePath='https://image.tmdb.org/t/p/w500';
export const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTYwNjk3MjBkOTYzZjk2YzgwZjMxMjU2YjVjYjY5NSIsIm5iZiI6MTcxODc4MDk3Mi4zOTgwMDAyLCJzdWIiOiI2NjcyODQyYzMxYjUxN2MyMDYyYTVmYjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LzYRiFfV_2GpS2AIuOPVTA3q_r0YJFO9HTYufKK7WqA';


export const menuItems = [
  {
    title: "Movies",
    links: [
      { name: "Popular", path: "/movie/popular" },
      { name: "Now Playing", path: "/movie/now_playing" },
      { name: "Upcoming", path: "/movie/upcoming" },
      { name: "Top Rated", path: "/movie/top_rated" },
    ],
  },
  {
    title: "TV Shows",
    links: [
      { name: "Popular", path: "/tv/popular" },
      { name: "Airing Today", path: "/tv/airing_today" },
      { name: "On TV", path: "/tv/on_the_air" },
      { name: "Top Rated", path: "/tv/top_rated" },
    ],
  },
  {
    title: "People",
    links: [
      { name: "Popular People", path: "/people/popular" },
    ],
  },
  // {
  //   title: "More",
  //   links: [
  //     { name: "Discussions", path: "/more/discussions" },
  //     { name: "Leaderboard", path: "/more/leaderboard" },
  //     { name: "Support", path: "/more/support" },
  //     { name: "API", path: "https://developer.themoviedb.org/docs/getting-started" },
  //   ],
  // },
];

export const Tabs = [
    'Most Popular',
    'Videos',
    'Backdrops',
    'Posters',
]