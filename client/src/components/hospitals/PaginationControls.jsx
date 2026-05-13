export default function PaginationControls({
  currentPage,
  pages,
  totalPages,
  onPrevious,
  onNext,
  onSelectPage,
}) {
  return (
    <div className="hospitals-pagination-controls">
      <button type="button" disabled={currentPage === 1} onClick={onPrevious}>
        Previous
      </button>
      {pages.map((page, index) => {
        if (page === "ellipsis") return <span key={`ellipsis-${index}`}>...</span>;

        return (
          <button
            key={page}
            type="button"
            className={page === currentPage ? "active" : ""}
            onClick={() => onSelectPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button type="button" disabled={currentPage === totalPages} onClick={onNext}>
        Next
      </button>
      <span aria-hidden="true">of {totalPages}</span>
    </div>
  );
}
