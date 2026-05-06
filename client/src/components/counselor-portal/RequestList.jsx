import RequestCard from "./RequestCard";

export default function RequestList({ requests, onAccept, acceptingId }) {
  return (
    <div className="portal-request-list">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onAccept={onAccept}
          isAccepting={acceptingId === request.id}
        />
      ))}
    </div>
  );
}
