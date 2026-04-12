import SessionRow from './SessionRow';

function SessionList({ sessions }) {
  return (
    <div className="ps-session-list">
      {sessions.map((session) => (
        <SessionRow
          key={session.id}
          icon={session.icon}
          title={session.title}
          meta={session.meta}
          current={session.current}
        />
      ))}
    </div>
  );
}

export default SessionList;
