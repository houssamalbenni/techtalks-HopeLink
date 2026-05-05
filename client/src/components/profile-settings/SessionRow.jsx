function SessionRow({ icon, title, meta, current }) {
  return (
    <div className="ps-session-row">
      <div className="ps-session-info">
        <div className={`ps-session-icon ${current ? 'current' : ''}`}>
          <i className={`fa-solid ${icon}`} aria-hidden="true" />
        </div>
        <div>
          <p className="ps-session-title">
            {title}
            {current ? <span>Current</span> : null}
          </p>
          <p className="ps-session-meta">{meta}</p>
        </div>
      </div>
      {!current ? (
        <button type="button" className="ps-revoke-btn">
          Revoke
        </button>
      ) : null}
    </div>
  );
}

export default SessionRow;
