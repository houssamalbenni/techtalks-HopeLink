const AidTopBar = () => {
  return (
    <div className="aid-topbar">
      <h1 className="aid-topbar-title">Aid Distribution Monitoring</h1>
      <div className="aid-topbar-actions">
        <button className="aid-export-btn">
          <svg viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.07-.44.18-.88.18-1.33C18 2.53 15.48 1 13 1c-1.36 0-2.5.93-3 2.28C9.5 1.93 8.36 1 7 1 4.52 1 2 2.53 2 4.67c0 .45.11.88.18 1.33H0v14h20V6zm-8.86-2.45C11.44 3.17 12.2 3 13 3c1.48 0 3 .9 3 1.67 0 .45-.32 1.33-1 1.33H9.43c.14-.52.43-1.44.71-2.45zM4 4.67C4 3.9 5.52 3 7 3c.8 0 1.56.17 1.86.55C9.14 4.56 9.43 5.48 9.57 6H5c-.68 0-1-.88-1-1.33zM18 18H2V8h16v10z" />
          </svg>
          Export Report
        </button>
        <button className="aid-new-batch-btn">+ New Batch</button>
        <div className="aid-expand-btn">
          <svg viewBox="0 0 24 24">
            <path d="M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AidTopBar;
