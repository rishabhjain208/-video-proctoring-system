import React, { useState } from 'react';
import Interview from './pages/Interview';
import Report from './pages/Report';
import './index.css'; // keep tailwind styles

function App() {
  // simple toggle to show Interview or Report page
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleInterviewComplete = () => {
    // after interview stops, show the report page
    // you can fetch report here from API if needed
    setReportData({
      candidate: 'John Doe',
      events: [
        { time: Date.now(), type: 'Multiple Faces', detail: '2 faces detected' },
        { time: Date.now(), type: 'Object Detected', detail: 'Cell phone detected' },
      ],
    });
    setShowReport(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Focus & Object Detection Interview</h1>

      {!showReport ? (
        <Interview onComplete={handleInterviewComplete} />
      ) : (
        <Report report={reportData} />
      )}
    </div>
  );
}

export default App;
