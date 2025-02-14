import React, { Suspense } from "react";
import Cast from "./Cast";
import { Link } from "react-router-dom";

interface MovieListProps {
    data: any;
    className: any;
    title: any
}
const CastList: React.FC<MovieListProps> = ({ data, className, title }) => {
    return (
        <div className="flex flex-col">
            <h3 className="text-xl font-bold">{title}</h3>
            <div className="relative">
                <div
                    className={`${className}`}
                    style={{ maxWidth: "100%", whiteSpace: "nowrap", paddingBottom: "10px" }}
                >
                    {data?.map((movie: any) => (
                        <div key={movie.id}>
                            <Suspense fallback={<p>Loading Movie...</p>}>
                                {/* <Link to={`/people/popular/${movie.id}`}> */}
                                    <Cast
                                        imageUrl={movie.profile_path}
                                        title={movie.name}
                                        id={movie.id}
                                    />
                                {/* </Link> */}
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CastList