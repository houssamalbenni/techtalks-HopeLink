export default function ErrorBanner({ error, onRetry }) {
  if (!error) {
    return null;
  }

  return (
    <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{error}</span>
      <button onClick={onRetry} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}>↺ Retry</button>
    </div>
  );
}
