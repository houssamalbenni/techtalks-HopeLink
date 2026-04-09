const StepHeader = () => {
  return (
    <div className="step-header">
      <div className="step-header__top">
        <span>Step 2 of 2</span>
        <span>Role & Details</span>
      </div>
      <div className="step-header__progress">
        <div className="step-header__progress-fill" />
      </div>
    </div>
  );
};

export default StepHeader;
