function ActionPanel({ title, description, buttonLabel, buttonIcon, buttonClassName, rowClassName, onAction }) {
  return (
    <div className={`ps-action-row ${rowClassName || ''}`.trim()}>
      <div>
        <p>{title}</p>
        <small>{description}</small>
      </div>
      <button type="button" className={buttonClassName} onClick={onAction}>
        <i className={`fa-solid ${buttonIcon}`} aria-hidden="true" />
        {buttonLabel}
      </button>
    </div>
  );
}

export default ActionPanel;
