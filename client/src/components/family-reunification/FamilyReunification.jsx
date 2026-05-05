import { useState, useEffect } from 'react';
import './FamilyReunification.css';
import FRSidebar from './FRSidebar';
import FRTopBar from './FRTopBar';
import CaseList from './CaseList';
import CaseDetail from './CaseDetail';
import { getMyCases, transformCaseToUI } from '../../../services/familyReunificationService';

const FamilyReunification = () => {
  const [cases, setCases] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const response = await getMyCases();
        const payload = response?.data || response;
        const cases = Array.isArray(payload)
          ? payload
          : payload?.cases || payload?.missingCases || [];

        const transformedCases = cases.map((missingCase, index) =>
          transformCaseToUI(missingCase, index)
        );
        setCases(transformedCases);
        // Set first case as selected if available
        if (transformedCases.length > 0) {
          setSelectedId(transformedCases[0].id);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch cases');
        console.error('Error fetching cases:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const selectedCase = cases.find((c) => c.id === selectedId);

  if (loading) {
    return (
      <div className="fr-page">
        <FRSidebar />
        <div className="fr-main">
          <FRTopBar />
          <div className="fr-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#6b7db3' }}>Loading cases...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fr-page">
        <FRSidebar />
        <div className="fr-main">
          <FRTopBar />
          <div className="fr-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#ef4444' }}>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fr-page">
      <FRSidebar />
      <div className="fr-main">
        <FRTopBar />
        <div className="fr-content">
          <CaseList cases={cases} selectedId={selectedId} onSelect={setSelectedId} />
          <CaseDetail selectedCase={selectedCase} selectedId={selectedId} />
        </div>
      </div>
    </div>
  );
};

export default FamilyReunification;
