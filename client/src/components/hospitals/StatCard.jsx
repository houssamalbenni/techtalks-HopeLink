export default function StatCard({ label, value, highlighted = false }) {
  return (
    <article>
      <span>{label}</span>
      <strong className={highlighted ? "primary" : ""}>{value}</strong>
    </article>
  );
}
