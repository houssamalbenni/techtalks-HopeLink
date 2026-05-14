import "./FamilyReunification.css";
import CaseList from "./CaseList";
import CaseDetail from "./CaseDetail";
import { FamilyReunificationProvider } from "../../../context/FamilyReunificationContext";
import { useState } from "react";
const FamilyReunification = () => {
  
  const [isCaseListOpen, setIsCaseListOpen] = useState(false);
  return (
    <FamilyReunificationProvider>
      <div className="fr-page">
        <div className={`fr-content ${isCaseListOpen ? "fr-list-open" : ""}`}>
            <button
              type="button"
              className="fr-mobile-menu-btn"
              aria-label="Toggle case list"
              aria-expanded={isCaseListOpen}
              onClick={() => setIsCaseListOpen((prev) => !prev)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <CaseList
              isMobileOpen={isCaseListOpen}
              onMobileClose={() => setIsCaseListOpen(false)}
            />
            <CaseDetail />
          </div>
        </div>
    </FamilyReunificationProvider>
  );
};

export default FamilyReunification;
