/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import ShowerTracker, { generateEmptyData } from '@/components/CommitGraph';
import ShowerTrackerControls from '@/components/CommitGraphControls';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    setData(generateEmptyData());
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  const addShower = () => {
    if (!selectedDate) return;

    setData(prevData => 
      prevData.map(day => {
        if (day.date === selectedDate) {
          const newCount = day.count + 1;
          const newLevel = Math.min(newCount, 4);
          return {
            ...day,
            count: newCount,
            level: newLevel
          };
        }
        return day;
      })
    );
  };

  const resetChart = () => {
    setData(generateEmptyData());
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            🚿 Shower Tracker
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Track your daily hygiene habits and build healthy routines. Every shower counts!
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
              💧 Your Shower Activity
            </h2>
            
            <ShowerTrackerControls
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onAddShower={addShower}
              onReset={resetChart}
            />

            <ShowerTracker data={data} />
          </div>
          
          <div className="text-center mt-8 p-4 bg-white/50 rounded-lg">
            <p className="text-sm text-slate-600">
              💡 <strong>Tip:</strong> Aim for at least one shower per day for optimal hygiene!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}3