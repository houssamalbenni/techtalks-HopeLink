function RoleCard({ role }) {
  const { cardClass, circleClass, iconClass, title, description, primaryAction, primaryClass } = role;

  return (
    <article className={`role-card ${cardClass}`}>
      <div className="card-top-line" />

      <div className={`icon-circle ${circleClass}`}>
        <i className={`fa-solid ${iconClass}`} aria-hidden="true" />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="card-buttons">
        <button type="button" className={`primary-btn ${primaryClass}`}>
          {primaryAction}
        </button>
        <button type="button" className="secondary-btn">
          Sign In
        </button>
      </div>
    </article>
  );
}

export default RoleCard;
