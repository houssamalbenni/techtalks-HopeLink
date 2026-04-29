import RequestCard from "./RequestCard";

export default function RequestList({ requests }) {
  return (
    <div className="portal-request-list">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
