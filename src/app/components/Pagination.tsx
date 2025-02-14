import ReactPaginate from "react-paginate";

interface PaginationProps {
    pageCount: number;
    HandlePageClick: any
}
const Pagination: React.FC<PaginationProps> = ({ pageCount, HandlePageClick }) => {
    return (
        <div className="pb-4">
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={HandlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Previous"
                renderOnZeroPageCount={null}
                containerClassName="flex justify-center items-center space-x-2 mt-6"
                pageClassName="px-3 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-300 cursor-pointer"
                activeClassName="bg-blue-600 text-white"
                previousClassName="px-3 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                nextClassName="px-3 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                breakClassName="px-3 py-2 text-gray-500"
            />
        </div>
    );
};

export default Pagination;
