import { capClass } from "./utils";

export default function CapacityBar({ used, total }) {
  const pct = Math.round((used / total) * 100);
  return (
    <div className={`cap-wrap ${capClass(pct)}`}>
      <span className="cap-label">
        {used}/{total}
      </span>
      <div className="cap-bar-bg">
        <div className="cap-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
