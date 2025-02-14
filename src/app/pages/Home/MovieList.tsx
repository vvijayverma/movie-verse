import React, { memo, lazy, Suspense } from "react";
const Movie = lazy(() => import("./Movie"));

interface MovieListProps {
    data: any;
    className: any;
}

const MovieList: React.FC<MovieListProps> = ({ data, className }) => {
    if (!data) return null;
    return (
        <div className="relative">
            <div
                className={`${className}`}
                style={{ maxWidth: "100%", whiteSpace: "nowrap", paddingBottom: "10px" }}
            >
                {data?.map((movie: any) => (
                    <div key={movie.id}>
                        <Suspense fallback={<p>Loading Movie...</p>}>
                            <Movie
                                keys={movie.id}
                                imageUrl={movie.poster_path || movie.profile_path}
                                createdAt={movie.release_date}
                                title={movie.title || movie.name}
                                vote={movie.vote_average}
                                media_type={movie.media_type}
                            />
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(MovieList);
