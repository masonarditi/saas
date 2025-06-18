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
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="container mx-auto py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-semibold text-slate-800 mb-3 tracking-tight">
              🚿 Shower as a Service (SaaS)
            </h1>
          </header>
          
          <div className="space-y-8">
            <ShowerTrackerControls
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onAddShower={addShower}
              onReset={resetChart}
            />

            <ShowerTracker data={data} />
            
            <div className="text-center">
              <p className="text-sm text-slate-600">
                Aim for at least one shower per day for optimal hygiene
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}