import "./FamilyReunification.css";
import CaseList from "./CaseList";
import CaseDetail from "./CaseDetail";
import { FamilyReunificationProvider } from "../../../context/FamilyReunificationContext";
const FamilyReunification = () => {
  return (
    <FamilyReunificationProvider>
      <div className="fr-page">
        <div className="fr-main">
          <div className="fr-content">
            <CaseList />
            <CaseDetail />
          </div>
        </div>
      </div>
    </FamilyReunificationProvider>
  );
};

export default FamilyReunification;
