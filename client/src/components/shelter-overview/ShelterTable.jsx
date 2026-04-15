import CapacityBar from "./CapacityBar";
import StatusBadge from "./StatusBadge";

export default function ShelterTable({
  paginated,
  selected,
  onToggleAll,
  onToggleRow,
  allChecked,
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <div className="cb-wrap">
                <input
                  type="checkbox"
                  className="cb"
                  checked={allChecked}
                  onChange={onToggleAll}
                />
              </div>
            </th>
            <th className="sortable">Shelter Name ↑</th>
            <th>City</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((shelter) => (
            <tr
              key={shelter.id}
              className={selected.has(shelter.id) ? "selected" : ""}
            >
              <td>
                <div className="cb-wrap">
                  <input
                    type="checkbox"
                    className="cb"
                    checked={selected.has(shelter.id)}
                    onChange={() => onToggleRow(shelter.id)}
                  />
                </div>
              </td>
              <td>
                <div className="shelter-cell">
                  <div className="shelter-icon-wrap">🏥</div>
                  <div>
                    <div className="shelter-name">{shelter.name}</div>
                    <div className="shelter-addr">{shelter.address}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="city-text">{shelter.city}</span>
              </td>
              <td>
                <CapacityBar used={shelter.capacity} total={shelter.total} />
              </td>
              <td>
                <StatusBadge status={shelter.status} />
              </td>
              <td>
                <div className="row-actions">
                  <button className="row-btn edit" title="Edit">
                    ✏️
                  </button>
                  <button className="row-btn" title="View">
                    👁
                  </button>
                  <button className="row-btn del" title="Delete">
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {paginated.length === 0 && (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "var(--text-muted)",
                }}
              >
                No shelters match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
