import React, { useState, useEffect } from 'react';
import { useGetPopularPersonsQuery } from 'src/app/services/slices/apiSlice';
import { imagePath } from 'src/app/constants/Keys';
import { Link } from 'react-router-dom';
import Pagination from 'src/app/components/Pagination';

const People = () => {
  const [page, setPage] = useState(1)
  const { data: popularPersons } = useGetPopularPersonsQuery(page, { refetchOnMountOrArgChange: false, });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const HandlePageClick = (event: any) => {
    setPage(event.selected + 1)
  };

  return (
    <div className="min-h-[calc(90vh-64px)] mt-16 w-full">
      <div className="flex flex-col pt-6 mx-12">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">Popular People</p>
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularPersons?.results.map((person: any) => (
            <div key={person.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-2 hover:shadow-xl transition duration-300">
              <Link to={`/people/popular/${person.id}`}>
                <img
                  src={`${imagePath}${person.profile_path}`}
                  alt={person.name}
                  className="rounded-md w-full h-[300px] object-cover"
                />
                <h3 className="text-lg font-semibold mt-3 text-gray-900 dark:text-white">{person.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{person.original_name}</p>
              </Link>
            </div>
          ))}
        </div>
        <Pagination pageCount={popularPersons?.total_pages} HandlePageClick={HandlePageClick} />
      </div>
    </div>
  )
}

export default People
