export default function SectionCard({ title, rightSlot, children }) {
  return (
    <section className="eh-card">
      <div className="eh-card-head">
        <h2>{title}</h2>
        {rightSlot ? <div>{rightSlot}</div> : null}
      </div>
      <div className="eh-card-body">{children}</div>
    </section>
  );
}
