export default function PaginationControls({ currentPage, pages, totalPages }) {
  return (
    <div className="hospitals-pagination-controls">
      <button type="button" disabled={currentPage === 1}>
        Previous
      </button>
      {pages.map((page, index) => {
        if (page === "ellipsis") return <span key={`ellipsis-${index}`}>...</span>;

        return (
          <button key={page} type="button" className={page === currentPage ? "active" : ""}>
            {page}
          </button>
        );
      })}
      <button type="button">Next</button>
      <span aria-hidden="true">of {totalPages}</span>
    </div>
  );
}
