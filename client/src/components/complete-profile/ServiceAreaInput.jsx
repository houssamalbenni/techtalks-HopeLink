const ServiceAreaInput = ({ value, onChange }) => {
  return (
    <div className="service-area">
      <p className="service-area__label">Service Area</p>
      <div className="service-area__input-wrap">
        <svg
          className="service-area__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2a7 7 0 00-7 7c0 4.76 6.12 12.23 6.38 12.55a.8.8 0 001.24 0C12.88 21.23 19 13.76 19 9a7 7 0 00-7-7zm0 9.6a2.6 2.6 0 110-5.2 2.6 2.6 0 010 5.2z" />
        </svg>
        <input
          className="service-area__input"
          type="text"
          placeholder="City, region, or countries you serve"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ServiceAreaInput;
