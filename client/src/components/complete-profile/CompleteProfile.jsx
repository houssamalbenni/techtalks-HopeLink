import StepHeader from "./StepHeader";
import RoleSelector from "./RoleSelector";
import FamilyStatus from "./FamilyStatus";
import PrimaryNeeds from "./PrimaryNeeds";
import FormActions from "./FormActions";
import GlobeVisual from "./GlobeVisual";
import ServiceAreaInput from "./ServiceAreaInput";
import "./complete-profile.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/userService";
import toast from "react-hot-toast";
import { useNotifications } from "../../../context/NotificationContext";
import { useState } from "react";
const CompleteProfile = ({
  onBack,
  selectedRole,
  onRoleChange,
  needs,
  onToggleNeed,
  familyStatus,
  onFamilyStatusChange,
  serviceArea,
  onServiceAreaChange,
  formData,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerToSocket } = useNotifications();
  const handleSubmit = async () => {
    if (isSubmitting) return;

    console.log("Submit", {
      selectedRole,
      needs,
      familyStatus,
      serviceArea,
      formData,
    });
    const { showPassword, consent, ...data } = formData;
    const need = [];
    if (needs.shelter) need.push("shelter");
    if (needs.food) need.push("food");
    if (needs.medcine) need.push("medcine");
    const payload = {
      ...data,
      role: selectedRole,
    };
    if (selectedRole === "refugee") {
      payload.family_number = familyStatus.familyMembers;
      payload.need = need;
    }
    setIsSubmitting(true);

    try {
      const res = await registerUser(payload);
      if (res) {
        console.log("Registration successful:", res);
        console.log("Received token:", res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("role", res.data.user.role);
        console.log(
          "Token stored in localStorage:",
          localStorage.getItem("token"),
        );
        toast.success("Registration successful! Redirecting to dashboard...");
        registerToSocket(res.data.user._id, res.data.user.role);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error?.message);
      onBack();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="complete-profile-page">
      <div
        className={`complete-profile-page__content${
          isSubmitting ? " complete-profile-page__content--loading" : ""
        }`}
      >
        <div className="complete-profile-page__form-column">
          <div className="complete-profile-card">
            <StepHeader />

            <div className="complete-profile-card__icon">
              <svg
                className="complete-profile-card__icon-svg"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
              </svg>
            </div>
            <h1 className="complete-profile-card__title">Complete Profile</h1>
            <p className="complete-profile-card__subtitle">
              Tell us how you'll be using the RefugeeLink platform to customize
              your experience.
            </p>

            <RoleSelector selectedRole={selectedRole} onSelect={onRoleChange} />
            {selectedRole === "refugee" && (
              <>
                <FamilyStatus
                  familyStatus={familyStatus}
                  onChange={onFamilyStatusChange}
                />
                <PrimaryNeeds needs={needs} onToggle={onToggleNeed} />
              </>
            )}
            {selectedRole === "ngo" && (
              <ServiceAreaInput
                value={serviceArea}
                onChange={onServiceAreaChange}
              />
            )}
            {selectedRole === "donor" && (
              <p className="role-info role-info--donor">
                Donor profile is ready. No additional profile fields are
                required.
              </p>
            )}
            <FormActions
              onBack={onBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        <GlobeVisual />
      </div>

      {isSubmitting && (
        <div
          className="complete-profile-page__loading-overlay"
          role="status"
          aria-live="polite"
        >
          <div className="complete-profile-page__loading-card">
            <span
              className="complete-profile-page__loader"
              aria-hidden="true"
            />
            <p className="complete-profile-page__loading-text">
              Creating the account...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteProfile;
