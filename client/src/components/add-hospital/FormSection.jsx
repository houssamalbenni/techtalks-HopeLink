export default function FormSection({ title, children }) {
  return (
    <section className="ah-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
