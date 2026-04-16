import { pageButtons } from "./utils";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  filteredLength,
}) {
  return (
    <div className="table-footer">
      <span className="entry-count">
        Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredLength)}–
        {Math.min(currentPage * rowsPerPage, filteredLength)} of{" "}
        {filteredLength} entries
      </span>

      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {pageButtons(totalPages).map((b, i) =>
          b === "…" ? (
            <span key={i} className="page-dots">
              …
            </span>
          ) : (
            <button
              key={i}
              className={`page-btn${currentPage === b ? " active" : ""}`}
              onClick={() => onPageChange(b)}
            >
              {b}
            </button>
          ),
        )}

        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
}
