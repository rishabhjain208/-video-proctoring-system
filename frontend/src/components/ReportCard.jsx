export default function ReportCard({ event }) {
  return (
    <div className="border rounded p-2 mb-2">
      <div className="text-xs text-gray-400">{new Date(event.time).toLocaleString()}</div>
      <div className="text-sm"><strong>{event.type}</strong> — {event.detail}</div>
    </div>
  );
}
