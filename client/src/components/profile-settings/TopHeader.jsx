function TopHeader({ title }) {
  return (
    <header className="ps-header">
      <div className="ps-header-left">
        <button type="button" className="ps-mobile-menu" aria-label="Open navigation">
          <i className="fa-solid fa-bars" aria-hidden="true" />
        </button>
        <h1>{title}</h1>
      </div>
      <button type="button" className="ps-bell-btn" aria-label="Notifications">
        <i className="fa-regular fa-bell" aria-hidden="true" />
        <span />
      </button>
    </header>
  );
}

export default TopHeader;
