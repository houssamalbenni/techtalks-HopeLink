import NavItem from "./NavItem";

export default function ChattingSidebar({
  navItems,
  brandTitle = "MindfulCare",
  brandSub = "You matter. We're here.",
  privacyTitle = "Your privacy matters",
  privacyText = "All messages are encrypted and confidential. Your mental health is safe with us.",
  privacyAction = "Learn more ->",
  onNavSelect,
}) {
  return (
    <aside className="chatting-sidebar">
      <div className="chatting-brand">
        <div className="brand-mark">
          <span className="brand-petal" />
          <span className="brand-petal" />
          <span className="brand-petal" />
        </div>
        <div>
          <div className="brand-title">{brandTitle}</div>
          <div className="brand-sub">{brandSub}</div>
        </div>
      </div>

      <nav className="chatting-nav">
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} onSelect={onNavSelect} />
        ))}
      </nav>

      <div className="privacy-card">
        <div className="privacy-badge">i</div>
        <div>
          <div className="privacy-title">{privacyTitle}</div>
          <div className="privacy-text">{privacyText}</div>
          <button className="privacy-link" type="button">{privacyAction}</button>
        </div>
      </div>

      <div className="sidebar-art">
        <div className="art-chair" />
        <div className="art-plant">
          <span />
          <span />
          <span />
        </div>
      </div>
    </aside>
  );
}
