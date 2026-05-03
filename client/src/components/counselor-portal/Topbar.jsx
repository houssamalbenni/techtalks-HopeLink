export default function Topbar({ title, subtitle }) {
  return (
    <header className="portal-topbar">
      <div>
        <h1>{title} <span className="topbar-mark">*</span></h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
}
