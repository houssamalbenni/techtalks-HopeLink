export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="portal-section-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button className="portal-action" type="button">{action}</button>
    </div>
  );
}
