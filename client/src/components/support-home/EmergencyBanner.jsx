export default function EmergencyBanner() {
  return (
    <section className="emergency-banner">
      <div className="emergency-icon">!</div>
      <div>
        <h2>Emergency Support</h2>
        <p>If you are in crisis or need immediate support, help is available.</p>
      </div>
      <button type="button" className="emergency-action">Chat with DC now</button>
    </section>
  );
}
