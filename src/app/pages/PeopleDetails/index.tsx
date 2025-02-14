import React, { useEffect } from 'react';
import { useGetPopularPersonDetailsQuery, useGetKnowForQuery } from 'src/app/services/slices/apiSlice';
import { Link, useParams } from 'react-router-dom';
import { imagePath } from 'src/app/constants/Keys';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import MovieList from '../Home/MovieList';

const PeopleDetails = () => {
    const { type } = useParams();
    const { data: peopleDetails } = useGetPopularPersonDetailsQuery(type, { refetchOnMountOrArgChange: false })
    const { data: knowFor } = useGetKnowForQuery(type, { refetchOnMountOrArgChange: false })
    // console.log(knowFor, '==========knowForknowFor========');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <section className="relative min-h-[calc(90vh-64px)] mt-16 w-full">
            <div className="relative w-full mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8 py-6 px-8">
                <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 flex flex-col items-center h-full">
                    <img
                        className="rounded-lg object-cover w-full h-[500px]"
                        src={`${imagePath}${peopleDetails?.profile_path}`}
                        alt="Movie Poster"
                    />
                    <div className="flex flex-col gap-6 mt-6">
                        <div className="flex gap-4 justify-center">
                            {[
                                { icon: <Facebook className="w-4 h-4 text-white" />, label: "Visit Facebook" },
                                { icon: <Twitter className="w-4 h-4 text-white" />, label: "Visit Twitter" },
                                { icon: <Instagram className="w-4 h-4 text-white" />, label: "Visit Instagram" },
                            ].map((social, index) => (
                                <div key={index} className="relative group">
                                    <div className="p-3 bg-black rounded-full hover:scale-110 transition">
                                        {social.icon}
                                    </div>
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                        {social.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <h2 className="text-2xl font-bold">Personal Info</h2>
                        <div className="space-y-4">
                            {[
                                { label: "Known For", value: peopleDetails?.known_for_department },
                                { label: "Gender", value: peopleDetails?.gender === 1 ? "Female" : "Male" },
                                { label: "Birthdate", value: peopleDetails?.birthday },
                                { label: "Place of Birth", value: peopleDetails?.place_of_birth },
                            ].map((info, index) => (
                                <div key={index} className="flex flex-col">
                                    <h3 className="font-semibold text-xl">{info.label}</h3>
                                    <p>{info.value || "N/A"}</p>
                                </div>
                            ))}
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-xl">Also Known As</h3>
                                {peopleDetails?.also_known_as?.length ? (
                                    peopleDetails.also_known_as.map((name: string, index: number) => (
                                        <p key={index} className="p-1">{name}</p>
                                    ))
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 md:col-span-2 sm:col-span-1 text-start">
                    <div className="pt-2">
                        <h2 className="text-3xl font-bold">{peopleDetails?.name}</h2>
                        <div className="mt-4">
                            <h3 className="text-xl font-bold pb-2">Biography</h3>
                            <p>{peopleDetails?.biography || "No biography available."}</p>
                        </div>
                    </div>

                    <div className="relative mx-auto px-3 mt-6">
                        <MovieList
                            data={knowFor?.cast?.slice(0, 10) || []}
                            className="flex gap-4 overflow-x-auto py-4 scroll-smooth custom-scrollbar"
                        />
                    </div>

                    <div className="mt-8 w-full">
                        <h3 className="text-2xl font-semibold pb-4">Acting</h3>
                        {knowFor?.cast?.length ? (
                            [...knowFor.cast]
                                .filter(item => item.release_date)
                                .sort((a, b) => Number(b.release_date?.slice(0, 4)) - Number(a.release_date?.slice(0, 4)))
                                .map((item: any) => (
                                    <div key={item.id} className="flex flex-col border border-gray-300 shadow-lg rounded-lg p-4 mb-4">
                                        <div className="flex gap-4 items-center">
                                            <span className="text-lg font-medium">{item.release_date?.slice(0, 4) || "N/A"}</span>
                                            <input type="radio" className="cursor-pointer" />
                                            <Link to={`/details/${item.media_type}/${item.id}`} className="text-lg hover:underline">
                                                {item.original_title || item.original_name || "Unknown Title"}
                                            </Link>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-500">No acting credits available.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default PeopleDetails