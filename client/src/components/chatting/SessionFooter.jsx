export default function SessionFooter({
  buttonText = "End Session",
  note = "Your session will end and messages will be cleared.",
}) {
  return (
    <div>
      <button className="end-session" type="button">{buttonText}</button>
      <div className="session-note">{note}</div>
    </div>
  );
}
