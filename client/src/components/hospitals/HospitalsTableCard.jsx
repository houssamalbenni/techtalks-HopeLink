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
  pagination,
}) {
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
            {hospitals.map((hospital) => (
              <HospitalRow
                key={hospital.id}
                hospital={hospital}
                isSelected={selectedRows.has(hospital.id)}
                onToggleSelection={onToggleRow}
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
        />
      </footer>
    </section>
  );
}
