export default function SupportHeader() {
  return (
    <header className="support-header">
      <div>
        <h1 className="welcome-title">Welcome Back</h1>
        <p>Immediate support without the pressure of direct interaction.</p>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="How are you feeling today?" aria-label="How are you feeling today?" />
        <button type="button">Search</button>
      </div>
    </header>
  );
}
