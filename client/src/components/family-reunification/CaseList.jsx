import { useState } from 'react';

const CaseList = ({ cases = [], selectedId, onSelect }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCases = cases.filter((c) => c.type === 'active').length;
  const matchedCases = cases.filter((c) => c.type === 'matched').length;
  const closedCases = cases.filter((c) => c.type === 'closed').length;

  const filteredCases = cases.filter((c) => {
    const matchesTab = 
      (activeTab === 'active' && c.type === 'active') ||
      (activeTab === 'matched' && c.type === 'matched') ||
      (activeTab === 'closed' && c.type === 'closed');
    
    const matchesSearch = 
      searchQuery === '' ||
      c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.relation.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="fr-left-panel">
      <p className="fr-panel-title">Privacy-First Search</p>

      <div className="fr-case-search">
        <svg viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search by Case ID or Alias..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="fr-tabs">
        <button 
          className={`fr-tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active ({activeCases})
        </button>
        <button 
          className={`fr-tab ${activeTab === 'matched' ? 'active' : ''}`}
          onClick={() => setActiveTab('matched')}
        >
          Matched ({matchedCases})
        </button>
        <button 
          className={`fr-tab ${activeTab === 'closed' ? 'active' : ''}`}
          onClick={() => setActiveTab('closed')}
        >
          Closed ({closedCases})
        </button>
      </div>

      {filteredCases.map((c) => (
        <div
          key={c.id}
          className={`fr-case-card ${selectedId === c.id ? 'selected' : ''}`}
          onClick={() => onSelect(c.id)}
        >
          <div className="fr-case-card-header">
            <p className="fr-case-id">{c.caseId}</p>
            <span className={`fr-status-badge ${c.statusClass}`}>
              {c.status === 'IN PROGRESS' && (
                <svg className="fr-status-spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              )}
              {c.status}
            </span>
          </div>
          <p className="fr-case-relation">Searching for: <span>{c.relation}</span></p>
          <p className="fr-case-updated">{c.updated}</p>
        </div>
      ))}
    </div>
  );
};

export default CaseList;
