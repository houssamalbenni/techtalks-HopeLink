const FormActions = ({ onBack, onSubmit, isSubmitting = false }) => {
  return (
    <div className="form-actions">
      <div className="form-actions__buttons">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="form-actions__button form-actions__button--secondary"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="form-actions__button form-actions__button--primary"
        >
          {isSubmitting ? "Creating account..." : "Complete Registration ✓"}
        </button>
      </div>
      <p className="form-actions__note">
        <svg className="form-actions__note-icon" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
        Your data is securely stored on decentralized nodes.
      </p>
    </div>
  );
};

export default FormActions;
