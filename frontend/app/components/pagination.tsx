interface PaginationProps {
  currentPage: number, 
  totalPages: number,
  onChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-2 justify-center fixed bottom-10 mb-5 w-full">

      <button 
        onClick={() => currentPage > 1 && onChange(currentPage - 1)}
        className="px-3 py-2 bg-neutral-800 text-white rounded disabled:opacity-40"
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`px-4 py-2 rounded font-medium 
              ${isActive ? "bg-purple-600 text-white" : "bg-neutral-800 text-gray-300"}`}
          >
            {page}
          </button>
        );
      })}

      <button 
        onClick={() => currentPage < totalPages && onChange(currentPage + 1)}
        className="px-3 py-2 bg-neutral-800 text-white rounded disabled:opacity-40"
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>

    </div>
  )
}
