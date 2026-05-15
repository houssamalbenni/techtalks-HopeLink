const buildLocation = (service) => {
  const address = service?.address;
  if (!address) return "Location not available";
  if (typeof address === "string") return address;
  return (
    [address.street, address.city].filter(Boolean).join(", ") ||
    "Location not available"
  );
};

const RequestCard = ({ request, onApprove, approvingId, formatTime }) => {
  const service = request?.service || {};
  const user = request?.user || {};
  const isApproved = request?.status === "approved";
  const isApproving = approvingId === request?._id;
  const serviceImage = service?.images?.[0];
  const createdLabel = request?.createdAt
    ? formatTime(request.createdAt)
    : "Unknown time";

  return (
    <div className={`rv-card ${isApproved ? "is-approved" : ""}`}>
      <div className="rv-card-top">
        <div className="rv-card-media">
          {serviceImage ? (
            <img src={serviceImage} alt={service?.title || "Service"} />
          ) : (
            <div className="rv-card-media-fallback">
              {service?.title?.[0] || "R"}
            </div>
          )}
        </div>
        <div className="rv-card-title">
          <h3>{service?.title || "Service request"}</h3>
          <span className="rv-time">{createdLabel}</span>
        </div>
        <div className="rv-badges">
          <span
            className={`rv-badge rv-priority ${request?.priority || "standard"}`}
          >
            {request?.priority || "standard"}
          </span>
          <span
            className={`rv-badge rv-status ${request?.status || "pending"}`}
          >
            {request?.status || "pending"}
          </span>
        </div>
      </div>

      <p className="rv-description">
        {request?.description || "No description"}
      </p>

      <div className="rv-meta">
        <div>
          <span className="rv-label">Requested by</span>
          <p>{user?.full_name || "Unknown"}</p>
        </div>
        <div>
          <span className="rv-label">Family size</span>
          <p>{user?.family_number || "1"}</p>
        </div>
        <div>
          <span className="rv-label">Location</span>
          <p>{buildLocation(service)}</p>
        </div>
        <div>
          <span className="rv-label">Contact</span>
          <p>{service?.phone_number || "Not provided"}</p>
        </div>
      </div>

      <div className="rv-actions">
        <button
          type="button"
          className={`rv-approve ${isApproved ? "is-approved" : ""}`}
          onClick={() => onApprove(request)}
          disabled={isApproved || isApproving}
        >
          {isApproved ? "Approved" : isApproving ? "Approving..." : "Approve"}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
