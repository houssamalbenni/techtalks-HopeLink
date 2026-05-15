import {
  buildServiceStatus,
  formatServiceAddress,
} from "../../../utils/helper";
import "./DetailPanel.css";
import { formatNotificationTime } from "../../../utils/helper";
import { requestService } from "../../../services/refugeeService";
import { toast } from "react-hot-toast";
import { useState } from "react";
const DetailPanel = ({
  selectedId,
  isOpen,
  onClose,
  requests = [],
  myRequests = [],
}) => {
  if (!selectedId) return null;
  const [loading, setLoading] = useState(false);
  const service = requests.find((s) => s._id === selectedId);
  const status = buildServiceStatus(service);
  const serviceAddress = formatServiceAddress(service.address);
  const filledCount = service.capacity - service.availability;
  const capacityPercentage = Math.min(
    100,
    (filledCount / service.capacity) * 100,
  );
  const isRequested = myRequests.includes(service._id);
  const handlerRequest = async (id) => {
    setLoading(true);
    try {
      if (isRequested) {
        toast.error("You have already requested this service.");
        return;
      }
      const data = {
        service: id,
        description: `Requesting service: ${service.address.building} at ${serviceAddress}`,
      };
      await requestService(data);
      toast.success("Request sent successfully!");
      myRequests.push(id);
    } catch (err) {
      console.error("Failed to send request:", err);
      toast.error("Failed to send request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`map-detail-panel ${!isOpen ? "closed" : ""}`}>
      <div className="detail-image-wrap">
        <img
          src={
            service.images?.[0] ||
            "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000"
          }
          alt={service.title}
          referrerPolicy="no-referrer"
        />
        <button className="detail-close-btn" onClick={onClose}>
          {/* <img src="../../../assets/close.png" alt="Close"/> */}x
        </button>
        <div className="detail-image-overlay">
          <span
            className={`detail-category-badge ${service.title?.toLowerCase() || "service"}`}
          >
            {service.title || "SERVICE"}
          </span>
          <h2 className="detail-name">{service.address.building}</h2>
        </div>
      </div>

      <div className="detail-body">
        <div className="capacity-card">
          <div className="capacity-header">
            <span className="capacity-label">Current Capacity</span>
            <span className={`capacity-status ${status.className}`}>
              {status.label}
            </span>
          </div>

          <div className="capacity-digits">
            <span className="capacity-count">{filledCount}</span>
            <span className="capacity-total">
              / {service.capacity} beds available
            </span>
          </div>

          <div className="capacity-progress-bg">
            <div
              className="capacity-progress-fill"
              style={{ width: `${capacityPercentage}%` }}
            ></div>
          </div>

          <p className="capacity-updated">
            Last updated: {formatNotificationTime(service.updatedAt)}
          </p>
        </div>

        <div className="detail-action-btns">
          <button
            className="detail-reserve-btn"
            onClick={() => handlerRequest(service._id)}
            disabled={loading}
          >
            <img
              src="../../../assets/bed.png"
              alt="Reserve"
              width="24"
              height="24"
            />
            {loading ? "Reserving..." : "Reserve Spot"}
          </button>
          <button
            className="detail-contact-btn"
            onClick={() => toast(`Call this number ${service.phone_number}`)}
          >
            <img
              src="../../../assets/phone-call.png"
              alt="Contact"
              width="24"
              height="24"
            />
            Contact
          </button>
        </div>

        <div className="info-section">
          <h3 className="info-section-title">Information</h3>

          <div className="info-list">
            <div className="info-item">
              <div className="info-icon">
                <img
                  src="../../../assets/blue-clock.png"
                  alt="Hours"
                  width="20"
                  height="20"
                />
              </div>
              <div className="info-content">
                <p className="info-label">Intake Hours</p>
                <p className="info-value">
                  {service.intake_hours?.startTime || "08:00 AM"} -{" "}
                  {service.intake_hours?.endTime || "10:00 PM"}{" "}
                  {service.intake_hours?.emergency_interval &&
                    `(Emergency ${service.intake_hours?.emergency_interval})`}
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <img
                  src="../../../assets/location.png"
                  alt="Address"
                  width="20"
                  height="20"
                />
              </div>
              <div className="info-content">
                <p className="info-label">Address</p>
                <p className="info-value">{serviceAddress}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <img
                  src="../../../assets/requirement.png"
                  alt="Requirements"
                  width="20"
                  height="20"
                />
              </div>
              <div className="info-content">
                <p className="info-label">Requirements</p>
                <p className="info-value">
                  {service.requirements || "no requirements needed"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
