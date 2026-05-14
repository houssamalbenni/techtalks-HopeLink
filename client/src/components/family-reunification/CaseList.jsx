import { useState, useEffect, useRef } from "react";
import { formatNotificationTime } from "../../../utils/helper";
import { createMissingPerson } from "../../../services/MissingPerson";
import toast from "react-hot-toast";
import { useFamilyReunification } from "../../../context/FamilyReunificationContext";
import { uploadLogo } from "../../../utils/supabaseClient";
import Skeleton from "./Skeleton";

const CaseList = ({isMobileOpen=false,onMobileClose}) => {
  const { cases, selectedId, setSelectedId, fetchCases, loading } =
    useFamilyReunification();
  const [activeTab, setActiveTab] = useState("inProgress");
  const [relationFilter, setRelationFilter] = useState("all");
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [isNewCaseClosing, setIsNewCaseClosing] = useState(false);
  const [generatingPhoto,SetGeneratingPhoto] = useState(false);
  const closeTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    last_known_location: "",
    last_known_date: "",
    photo: null,
    note: "",
  });
  const activeCases = cases.filter((c) => c.status === "inProgress").length;
  const matchedCases = cases.filter((c) => c.status === "matched").length;

  const openNewCase = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsNewCaseClosing(false);
    setIsNewCaseOpen(true);
  };

  const closeNewCase = () => {
    if (!isNewCaseOpen || isNewCaseClosing) {
      return;
    }

    setIsNewCaseClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsNewCaseOpen(false);
      setIsNewCaseClosing(false);
      closeTimeoutRef.current = null;
    }, 240);
  };
  const create = async (data) => {
    try {
      console.log("New case form:", formData);
      const image = localStorage.getItem("user_photo");
      const fullData = { ...data, image: image || null };
      console.log("Submitting case with data:", fullData);
      const res = await createMissingPerson(fullData);
      console.log("Created case:", res.data);
      if (fetchCases) {
        fetchCases({ showLoading: false });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await create(formData);
    setFormData({
      name: "",
      relation: "",
      last_known_location: "",
      last_known_date: "",
      photo: null,
      note: "",
    });
    closeNewCase();
  };
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      console.log(files);
      SetGeneratingPhoto(true);
      const publicPhotoUrl = await uploadLogo(files[0]);
      SetGeneratingPhoto(false)
      console.log(publicPhotoUrl);
      setFormData((prev) => ({
        ...prev,
        photo: publicPhotoUrl,
      }));
      return;
    }

    if (name === "last_known_date") {
      setFormData((prev) => ({
        ...prev,
        last_known_date: new Date(value).toISOString(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  useEffect(
    () => () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    },
    [],
  );
  const filteredCases = cases.filter((c) => {
    const matchesTab =
      (activeTab === "inProgress" && c.status === "inProgress") ||
      (activeTab === "matched" && c.status === "matched");
    const matchesRelation =
      relationFilter === "all" || c.relation === relationFilter;

    return matchesTab && matchesRelation;
  });

  return (
    <div className={`fr-left-panel ${isMobileOpen ? "fr-left-open" : ""}`}>
      <div className="case">
        <p className="fr-panel-title">Privacy-First Search</p>
        <button className="fr-new-case-btn" type="button" onClick={openNewCase}>
          New Case
        </button>
      </div>
      <div className="fr-case-search">
        <select
          className="fr-case-search-select"
          value={relationFilter}
          onChange={(e) => setRelationFilter(e.target.value)}
        >
          <option value="all">All relations</option>
          <option value="brother">Brother</option>
          <option value="daughter">Daughter</option>
          <option value="sister">Sister</option>
          <option value="father">Father</option>
          <option value="mother">Mother</option>
          <option value="spouse">Spouse</option>
          <option value="son">Son</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="fr-tabs">
        <button
          className={`fr-tab ${activeTab === "inProgress" ? "active" : ""}`}
          onClick={() => setActiveTab("inProgress")}
        >
          Active ({activeCases})
        </button>
        <button
          className={`fr-tab ${activeTab === "matched" ? "active" : ""}`}
          onClick={() => setActiveTab("matched")}
        >
          Matched ({matchedCases})
        </button>
      </div>
      {isNewCaseOpen && (
        <div
          className={`fr-modal-backdrop ${isNewCaseClosing ? "fr-modal-backdrop-closing" : "fr-modal-backdrop-open"}`}
          onClick={closeNewCase}
        >
          <div
            className={`fr-new-case-modal ${isNewCaseClosing ? "fr-new-case-modal-closing" : "fr-new-case-modal-open"}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="fr-new-case-modal-header">
              <div>
                <p className="fr-new-case-kicker">New Case</p>
                <h3>Missing person details</h3>
              </div>
              <button
                type="button"
                className="fr-modal-close-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  closeNewCase();
                }}
              >
                ×
              </button>
            </div>

            <form className="fr-new-case-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span>Relation</span>
                <select
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select relation</option>
                  <option value="brother">Brother</option>
                  <option value="daughter">Daughter</option>
                  <option value="sister">Sister</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="spouse">Spouse</option>
                  <option value="son">Son</option>
                  <option value="others">Others</option>
                </select>
              </label>

              <label>
                <span>Last known location</span>
                <input
                  type="text"
                  name="last_known_location"
                  value={formData.last_known_location}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Last known date</span>
                <input
                  type="datetime-local"
                  name="last_known_date"
                  value={
                    formData.last_known_date
                      ? new Date(formData.last_known_date)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Photo</span>
                <input type="file" name="photo" onChange={handleChange} />
              </label>

              <label className="fr-new-case-notes">
                <span>Notes</span>
                <input
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                />
              </label>

              <div className="fr-new-case-actions">
                <button
                  type="button"
                  className="fr-new-case-cancel"
                  onClick={(event) => {
                    event.stopPropagation();
                    closeNewCase();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="fr-new-case-submit" disabled={generatingPhoto} style={generatingPhoto ? { cursor: "not-allowed" } : {}}>
                  Create case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={`case-skeleton-${index}`} />
          ))
        : filteredCases.map((c, index) => (
            <div
              key={c._id}
              className={`fr-case-card ${selectedId === c._id ? "selected" : ""}`}
              onClick={() => {
                setSelectedId(c._id);
                if (onMobileClose) {
                  onMobileClose();
                }
              }}
            >
              <div className="fr-case-card-header">
                <p className="fr-case-id">
                  Case #{c.owner.full_name.substring(0, 2).toUpperCase()}-
                  {c._id.substring(0, 4)}-{c._id.substring(4, 8)}-
                  {c._id.substring(8, 12)}
                </p>
                <span
                  className={`fr-status-badge ${c.status === "inProgress" ? "fr-status-progress" : "fr-status-matched"}`}
                >
                  {c.status === "inProgress" && (
                    <svg className="fr-status-spinner" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        fill="currentColor"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                      />
                    </svg>
                  )}
                  {c.status}
                </span>
              </div>
              <p className="fr-case-relation">
                Searching for: <span>{c.relation}</span>
              </p>
              <p className="fr-case-updated">
                Last Updated: {formatNotificationTime(c.updatedAt)}
              </p>
            </div>
          ))}
    </div>
  );
};

export default CaseList;
