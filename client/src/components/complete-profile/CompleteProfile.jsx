import { useState } from 'react';
import StepHeader from './StepHeader';
import RoleSelector from './RoleSelector';
import FamilyStatus from './FamilyStatus';
import PrimaryNeeds from './PrimaryNeeds';
import NGOFields from './NGOFields';
import DonorFields from './DonorFields';
import FormActions from './FormActions';
import GlobeVisual from './GlobeVisual';
import './complete-profile.css';

const CompleteProfile = () => {
  const [selectedRole, setSelectedRole] = useState('refugee');
  const [needs, setNeeds] = useState({
    shelter: true,
    food: true,
    medical: false,
    legal: true,
  });
  const [familyStatus, setFamilyStatus] = useState({
    familyMembers: '',
    children: '',
  });
  const [ngoData, setNgoData] = useState({
    organizationName: '',
    registrationId: '',
    serviceArea: '',
  });
  const [donorData, setDonorData] = useState({
    donationPreference: '',
    focusArea: '',
  });

  const toggleNeed = (key) => {
    setNeeds((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBack = () => {
    console.log('Go back');
  };

  const handleSubmit = () => {
    const formData = {
      selectedRole,
      needs,
      familyStatus,
      ...(selectedRole === 'ngo' && { ngoData }),
      ...(selectedRole === 'donor' && { donorData }),
    };
    console.log('Submit', formData);
  };

  return (
    <div className="complete-profile-page">
      <div className="complete-profile-page__form-column">
        <div className="complete-profile-card">
          <StepHeader />

          <div className="complete-profile-card__icon">
            <svg className="complete-profile-card__icon-svg" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </div>
          <h1 className="complete-profile-card__title">Complete Profile</h1>
          <p className="complete-profile-card__subtitle">
            Tell us how you'll be using the RefugeeLink platform to customize your experience.
          </p>

          <RoleSelector selectedRole={selectedRole} onSelect={setSelectedRole} />
          
          {selectedRole === 'ngo' && <NGOFields ngoData={ngoData} onChange={setNgoData} />}
          {selectedRole === 'donor' && <DonorFields donorData={donorData} onChange={setDonorData} />}
          {selectedRole === 'refugee' && (
            <>
              <FamilyStatus familyStatus={familyStatus} onChange={setFamilyStatus} />
              <PrimaryNeeds needs={needs} onToggle={toggleNeed} />
            </>
          )}
          
          <FormActions onBack={handleBack} onSubmit={handleSubmit} />
        </div>
      </div>

      <GlobeVisual />
    </div>
  );
};

export default CompleteProfile;
