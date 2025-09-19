import React from 'react';
import ReportCard from '../components/ReportCard';

export default function Report({ report }) {
  if(!report) return <div className="bg-white p-6 rounded shadow">No report available</div>;
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Proctoring Report</h2>
      {/* candidate info */}
      <h3 className="mt-6 font-semibold">Events</h3>
      {report.events.map((e,i)=><ReportCard key={i} event={e} />)}
    </div>
  );
}
