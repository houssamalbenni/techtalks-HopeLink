import HospitalRow from "./HospitalRow";
import PaginationControls from "./PaginationControls";

const TABLE_COLUMNS = ["Hospital Name", "Location", "Contact", "Status", "Capacity"];

export default function HospitalsTableCard({
  selectedCount,
  allSelected,
  onToggleAll,
  hospitals,
  selectedRows,
  onToggleRow,
  onDeleteRow,
  isLoading,
  pagination,
  onPreviousPage,
  onNextPage,
  onSelectPage,
}) {
  const skeletonRows = Array.from({ length: 6 }, (_, index) => index);

  return (
    <section className="hospitals-table-card">
      {selectedCount > 0 && (
        <div className="hospitals-bulk-actions" id="bulk-actions">
          <p>{selectedCount} hospitals selected</p>
          <div>
            <button type="button">Update Status</button>
            <button type="button" className="danger">
              Deactivate
            </button>
          </div>
        </div>
      )}

      <div className="hospitals-table-scroll">
        <table>
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  className={`hospitals-check ${allSelected ? "is-selected" : ""}`}
                  aria-label="Select all hospitals"
                  onClick={onToggleAll}
                >
                  <i className={`fa-solid ${allSelected ? "fa-check" : "fa-minus"}`} />
                </button>
              </th>
              {TABLE_COLUMNS.map((column) => (
                <th key={column}>{column}</th>
              ))}
              <th className="align-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? skeletonRows.map((row) => (
                <tr key={`skeleton-${row}`} className="hospitals-skeleton-row">
                  <td>
                    <div className="hospitals-skeleton-box sm" />
                  </td>
                  <td>
                    <div className="hospitals-skeleton-cell">
                      <div className="hospitals-skeleton-box avatar" />
                      <div className="hospitals-skeleton-lines">
                        <div className="hospitals-skeleton-box lg" />
                        <div className="hospitals-skeleton-box md" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="hospitals-skeleton-lines">
                      <div className="hospitals-skeleton-box md" />
                      <div className="hospitals-skeleton-box sm" />
                    </div>
                  </td>
                  <td>
                    <div className="hospitals-skeleton-lines">
                      <div className="hospitals-skeleton-box sm" />
                      <div className="hospitals-skeleton-box md" />
                    </div>
                  </td>
                  <td>
                    <div className="hospitals-skeleton-box badge" />
                  </td>
                  <td>
                    <div className="hospitals-skeleton-lines">
                      <div className="hospitals-skeleton-box bar" />
                      <div className="hospitals-skeleton-box md" />
                    </div>
                  </td>
                  <td className="align-right">
                    <div className="hospitals-skeleton-actions">
                      <div className="hospitals-skeleton-box icon" />
                      <div className="hospitals-skeleton-box icon" />
                    </div>
                  </td>
                </tr>
              ))
              : hospitals.map((hospital) => (
                <HospitalRow
                  key={hospital.id}
                  hospital={hospital}
                  isSelected={selectedRows.has(hospital.id)}
                  onToggleSelection={onToggleRow}
                  onDelete={onDeleteRow}
                />
              ))}
          </tbody>
        </table>
      </div>

      <footer className="hospitals-pagination">
        <p>
          Showing <strong>{pagination.from}</strong> to <strong>{pagination.to}</strong> of <strong>{pagination.total}</strong> results
        </p>
        <PaginationControls
          currentPage={pagination.currentPage}
          pages={pagination.pages}
          totalPages={pagination.totalPages}
          onPrevious={onPreviousPage}
          onNext={onNextPage}
          onSelectPage={onSelectPage}
        />
      </footer>
    </section>
  );
}
