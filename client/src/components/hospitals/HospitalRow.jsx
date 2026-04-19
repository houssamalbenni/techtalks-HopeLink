import StatusBadge from "./StatusBadge";

function capacityColor(status) {
  if (status === "maintenance") return "var(--hospital-amber)";
  if (status === "capacity") return "var(--hospital-red)";
  return "var(--hospital-green)";
}

export default function HospitalRow({ hospital, isSelected, onToggleSelection }) {
  const occupancyPercent = Math.round((hospital.occupiedBeds / hospital.totalBeds) * 100);

  return (
    <tr className={isSelected ? "is-selected-row" : ""}>
      <td>
        <button
          type="button"
          className={`hospitals-check ${isSelected ? "is-selected" : ""}`}
          aria-label={`Select ${hospital.name}`}
          onClick={() => onToggleSelection(hospital.id)}
        >
          {isSelected && <i className="fa-solid fa-check" />}
        </button>
      </td>

      <td>
        <div className="hospital-name-cell">
          <div className={`hospital-icon ${isSelected ? "selected" : ""}`}>
            <i className="fa-solid fa-hospital" />
          </div>
          <div>
            <p className={isSelected ? "strong" : ""}>{hospital.name}</p>
            <span>ID: {hospital.id}</span>
          </div>
        </div>
      </td>

      <td>
        <p className={isSelected ? "strong" : ""}>{hospital.city}</p>
        <span>{hospital.district}</span>
      </td>

      <td>
        <p className={isSelected ? "strong" : ""}>{hospital.email}</p>
        <span>{hospital.phone}</span>
      </td>

      <td>
        <StatusBadge status={hospital.status} />
      </td>

      <td>
        <div className="hospital-capacity-cell">
          <div className="hospital-capacity-track">
            <div
              className="hospital-capacity-fill"
              style={{
                width: `${occupancyPercent}%`,
                backgroundColor: capacityColor(hospital.status),
              }}
            />
          </div>
          <span>
            {hospital.occupiedBeds}/{hospital.totalBeds}
          </span>
        </div>
      </td>

      <td className="align-right">
        <div className="hospital-actions">
          <button type="button" title="View Details" aria-label="View details">
            <i className="fa-regular fa-eye" />
          </button>
          <button type="button" title="Edit" aria-label="Edit hospital">
            <i className="fa-solid fa-pen" />
          </button>
        </div>
      </td>
    </tr>
  );
}
