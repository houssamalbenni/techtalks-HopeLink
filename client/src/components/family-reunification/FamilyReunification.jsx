import { useState } from 'react';
import './FamilyReunification.css';
import FRSidebar from './FRSidebar';
import FRTopBar from './FRTopBar';
import CaseList from './CaseList';
import CaseDetail from './CaseDetail';

const FamilyReunification = () => {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="fr-page">
      <FRSidebar />
      <div className="fr-main">
        <FRTopBar />
        <div className="fr-content">
          <CaseList selectedId={selectedId} onSelect={setSelectedId} />
          <CaseDetail />
        </div>
      </div>
    </div>
  );
};

export default FamilyReunification;
