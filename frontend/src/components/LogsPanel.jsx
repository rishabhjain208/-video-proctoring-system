export default function LogsPanel({ logs }) {
  return (
    <div className="h-80 overflow-auto border rounded p-2 bg-gray-50">
      {logs.length === 0 && <div className="text-sm text-gray-500">No events yet</div>}
      {logs.slice().reverse().map((l,i)=>(
        <div key={i} className="mb-2">
          <div className="text-xs text-gray-400">{new Date(l.time).toLocaleTimeString()}</div>
          <div className="text-sm"><strong>{l.type}</strong> — {l.detail}</div>
        </div>
      ))}
    </div>
  );
}
