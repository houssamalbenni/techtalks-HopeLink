import { useNavigate } from "react-router-dom";

function RoleCard({ role }) {
  const { cardClass, circleClass, iconClass, title, description,type, primaryAction, primaryClass } = role;
  const navigate=useNavigate();
  return (
    <article className={`role-card ${cardClass}`}>
      <div className="card-top-line" />

      <div className={`icon-circle ${circleClass}`}>
        <i className={`fa-solid ${iconClass}`} aria-hidden="true" />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="card-buttons">
        <button type="button" className={`primary-btn ${primaryClass}`} onClick={()=>navigate(`/create/${type}`)}>
          {primaryAction}
        </button>
        <button type="button" className="secondary-btn" onClick={()=>navigate("/login")}>
          Sign In
        </button>
      </div>
    </article>
  );
}

export default RoleCard;
