import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 fixed bottom-0 w-[600px]">
          {/* เพิ่ม fixed bottom-0 w-full เพื่อให้เป็น Sticky Footer */}
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{currentPage}</span> to{" "}
                <span className="font-medium">{totalPages}</span> of{" "}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-ifcg-red-high ring-1 ring-inset ring-gray-300 hover:bg-ifcg-red-low focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      number === currentPage
                        ? "bg-ifcg-red-high text-white"
                        : "text-ifcg-red-high"
                    } ring-1 ring-inset ring-gray-300 hover:bg-ifcg-red-low focus:z-20 focus:outline-offset-0`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-ifcg-red-high ring-1 ring-inset ring-gray-300 hover:bg-ifcg-red-low focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
