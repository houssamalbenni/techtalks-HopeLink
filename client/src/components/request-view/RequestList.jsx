import RequestCard from "./RequestCard";

const RequestList = ({ requests, onApprove, approvingId, formatTime }) => {
  if (!requests || requests.length === 0) {
    return (
      <div className="rv-empty">
        <h2>No requests yet</h2>
        <p>When a new request arrives, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="rv-grid">
      {requests.map((request) => (
        <RequestCard
          key={request._id}
          request={request}
          onApprove={onApprove}
          approvingId={approvingId}
          formatTime={formatTime}
        />
      ))}
    </div>
  );
};

export default RequestList;
