import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import FullScreenLoader from "./components/Loader";

const Home = lazy(() => import('./pages/Home'))
const MovieAndTv = lazy(()=>import('./pages/MovieTv'))
const People = lazy(() => import('./pages/People'))
const MovieTvDetails = lazy(()=>import('./pages/MovieTvDetails'))
const PeopleDetails = lazy(()=>import('./pages/PeopleDetails'))


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
       {path: '/:category/:type', element:<MovieAndTv/>},
       {path: '/details/:category/:type', element:<MovieTvDetails/>},
      { path: "/people/popular", element: <People /> },
      { path: "/people/popular/:type", element: <PeopleDetails /> },
    ],
  },
],
);
export function App() {
  return (
    <Suspense fallback={<FullScreenLoader/>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
