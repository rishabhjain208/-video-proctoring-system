import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import LogsPanel from '../components/LogsPanel';
import Controls from '../components/Controls';
import useProctoring from '../hooks/useProctoring';
import { createLog, uploadInterview } from '../api';

export default function Interview({ onComplete }) {
  const videoRef = React.useRef(null);
  const { ready: modelsReady, detect } = useProctoring();

  const [logs, setLogs] = React.useState([]);
  const [running, setRunning] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(null);

  // start webcam on mount
  React.useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error('Could not access camera:', err);
      }
    })();
    return () => {
      // stop webcam when unmount
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const addLog = React.useCallback(async (type, detail) => {
    const entry = { time: Date.now(), type, detail };
    setLogs(prev => [...prev, entry]);
    // optionally send to backend
    try {
      await createLog(entry, 'someInterviewId'); // replace with real interview ID
    } catch (err) {
      console.error('Log upload failed', err);
    }
  }, []);

  const startProctoring = React.useCallback(() => {
    if (!videoRef.current) return;
    setRunning(true);
    const id = setInterval(async () => {
      const { faces, items } = await detect(videoRef.current);
      // Example: trigger log if >1 face or if phone detected
      if (faces.length > 1) {
        addLog('Multiple Faces', `${faces.length} faces detected`);
      }
      const hasPhone = items.some(item => /cell phone/i.test(item.class));
      if (hasPhone) {
        addLog('Object Detected', 'Cell phone detected');
      }
    }, 2000); // run every 2s
    setIntervalId(id);
  }, [detect, addLog]);

  const stopProctoring = React.useCallback(async () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setRunning(false);
    // upload full session (if you recorded it separately)
    try {
      const formData = new FormData();
      formData.append('interviewId', 'someInterviewId');
      formData.append('logs', JSON.stringify(logs));
      await uploadInterview(formData);
      addLog('Session Ended', 'Interview data uploaded');
    } catch (err) {
      console.error('Upload interview failed', err);
    }
    if (onComplete) onComplete();
  }, [intervalId, logs, addLog, onComplete]);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <VideoPlayer videoRef={videoRef} />
        <Controls
          onStart={startProctoring}
          onStop={stopProctoring}
          running={running}
          modelsReady={modelsReady}
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Proctoring Logs</h2>
        <LogsPanel logs={logs} />
      </div>
    </div>
  );
}
