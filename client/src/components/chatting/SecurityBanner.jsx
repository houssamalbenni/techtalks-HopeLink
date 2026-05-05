export default function SecurityBanner({
  title = "Secure & Private",
  sub = "Your conversations are end-to-end encrypted and confidential.",
  badge = "OK",
}) {
  return (
    <div className="security-banner">
      <div className="shield">{badge}</div>
      <div>
        <div className="security-title">{title}</div>
        <div className="security-sub">{sub}</div>
      </div>
    </div>
  );
}
