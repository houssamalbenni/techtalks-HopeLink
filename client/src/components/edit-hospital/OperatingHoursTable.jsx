export default function OperatingHoursTable({ days, hours, disabled, onChange }) {
  return (
    <div className={`eh-hours-wrap ${disabled ? "is-disabled" : ""}`}>
      {days.map((day) => (
        <div key={day} className="eh-hours-row">
          <span>{day}</span>
          <input
            type="time"
            value={hours[day].open}
            disabled={disabled}
            onChange={(event) => onChange(day, "open", event.target.value)}
          />
          <input
            type="time"
            value={hours[day].close}
            disabled={disabled}
            onChange={(event) => onChange(day, "close", event.target.value)}
          />
        </div>
      ))}
      {disabled ? <p>Uncheck "24/7 Facility" to set custom hours.</p> : null}
    </div>
  );
}
