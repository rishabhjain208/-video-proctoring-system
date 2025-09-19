export default function Controls({ onStart, onStop, running, modelsReady }) {
  return (
    <div className="mt-3 flex gap-2">
      <button onClick={onStart} disabled={running || !modelsReady} className="px-4 py-2 bg-blue-600 text-white rounded">
        Start
      </button>
      <button onClick={onStop} disabled={!running} className="px-4 py-2 bg-red-600 text-white rounded">
        Stop & Upload
      </button>
      <div className="ml-4">Models: {modelsReady ? 'ready' : 'loading...'}</div>
    </div>
  );
}
