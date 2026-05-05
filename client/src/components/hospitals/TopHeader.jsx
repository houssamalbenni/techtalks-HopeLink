export default function TopHeader({ breadcrumbStart, currentPage, actionLabel, breadcrumbs, actions }) {
  const resolvedBreadcrumbs =
    breadcrumbs || [
      { label: breadcrumbStart },
      { label: currentPage, current: true },
    ];

  const resolvedActions =
    actions || [
      { label: actionLabel, variant: "primary", icon: "fa-solid fa-plus" },
    ];

  return (
    <header id="header" className="hospitals-header">
      <div className="hospitals-breadcrumb">
        <button type="button" className="hospitals-menu-btn" aria-label="Toggle menu">
          <i className="fa-solid fa-bars" />
        </button>

        {resolvedBreadcrumbs.map((crumb, index) => {
          const isLast = index === resolvedBreadcrumbs.length - 1;

          return (
            <span key={`${crumb.label}-${index}`} className="hospitals-breadcrumb-item">
              {crumb.current || isLast ? (
                <strong>{crumb.label}</strong>
              ) : crumb.href ? (
                <a href={crumb.href}>{crumb.label}</a>
              ) : (
                <span>{crumb.label}</span>
              )}
              {!isLast && <i className="fa-solid fa-chevron-right" />}
            </span>
          );
        })}
      </div>

      <div className="hospitals-header-actions">
        {resolvedActions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={action.variant === "secondary" ? "hospitals-secondary-btn" : "hospitals-primary-btn"}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.icon && <i className={action.icon} />} {action.label}
          </button>
        ))}
      </div>
    </header>
  );
}
