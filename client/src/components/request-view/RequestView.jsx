import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import "./RequestView.css";
import RequestList from "./RequestList";
import RequestSkeleton from "./RequestSkeleton";
import {
  getAllRefugeeRequests,
  updateRefugeeRequest,
} from "../../../services/refugeeService";
import { formatNotificationTime } from "../../../utils/helper";
import { useNotifications } from "../../../context/NotificationContext";
import { useNavBar } from "../../../context/NavBarContext";

const extractRequests = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.requests)) return payload.data.requests;
  if (Array.isArray(payload?.requests)) return payload.requests;
  return [];
};

const RequestView = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvingId, setApprovingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const { sendPrivateMessage } = useNotifications();
  const { setNavItems, setPhoto } = useNavBar();
  const userId = useMemo(() => localStorage.getItem("userId") || "", []);

  useEffect(() => {
    setNavItems([
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Announcements", path: "/admin/announcement" },
      { label: "Refugee Requests", path: "/request-view" },
      {
        label: "Services Management",
        path: "/hospital",
        alt: [
          "/shelter",
          "/add-shelter",
          "/add-hospital",
          "/edit-shelter",
          "/edit-hospital",
        ],
      },
    ]);
    const photo = localStorage.getItem("user_photo");
    setPhoto(photo);
  }, [setNavItems, setPhoto]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllRefugeeRequests();
      const list = extractRequests(res);
      setRequests(list);
    } catch (err) {
      setError(err.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    if (statusFilter === "all") {
      return requests;
    }
    return requests.filter((request) => request?.status === statusFilter);
  }, [requests, statusFilter]);

  const handleApprove = async (request) => {
    if (!request?._id || request?.status === "approved") {
      return;
    }
    setApprovingId(request._id);
    try {
      await updateRefugeeRequest(request._id, { status: "approved" });
      setRequests((prev) =>
        prev.map((item) =>
          item._id === request._id
            ? {
                ...item,
                status: "approved",
                updatedAt: new Date().toISOString(),
              }
            : item,
        ),
      );
      toast.success("Request approved.");

      if (request?.user?._id && userId) {
        sendPrivateMessage({
          senderId: userId,
          receivedId: request.user._id,
          title: "Request approved",
          message: `Your request for ${request?.service?.address.building || "service"} has been accepted.`,
          type: "aid_request_update",
          priority: "normal",
          audience: "private",
        });
      }
    } catch (err) {
      toast.error(err.message || "Failed to approve request.");
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <div className="request-view-page">
      <div className="request-view-header">
        <div>
          <h1>Refugee Service Requests</h1>
          <p>Review incoming requests and confirm approvals in real time.</p>
        </div>
        <div className="rv-header-actions">
          <div className="rv-filter">
            <span className="rv-filter-label">Status</span>
            <div
              className="rv-filter-tabs"
              role="tablist"
              aria-label="Filter requests"
            >
              {[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "approved", label: "Approved" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={statusFilter === option.value}
                  className={`rv-filter-tab ${
                    statusFilter === option.value ? "is-active" : ""
                  }`}
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="rv-refresh"
            onClick={fetchRequests}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {error && <div className="rv-error">{error}</div>}

      {loading ? (
        <div className="rv-grid">
          {Array.from({ length: 6 }).map((_, idx) => (
            <RequestSkeleton key={`request-skeleton-${idx}`} />
          ))}
        </div>
      ) : (
        <RequestList
          requests={filteredRequests}
          onApprove={handleApprove}
          approvingId={approvingId}
          formatTime={formatNotificationTime}
        />
      )}
    </div>
  );
};

export default RequestView;
