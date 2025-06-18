/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import ShowerTracker, { generateEmptyData } from '@/components/CommitGraph';
import ShowerTrackerControls from '@/components/CommitGraphControls';
import StinkyFriendButton from '@/components/StinkyFriendButton';

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(generateEmptyData());
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const hasShoweredToday = data.find(day => day.date === today)?.count > 0;

  const addShower = () => {
    if (hasShoweredToday) return;
    
    setData(prevData => 
      prevData.map(day => {
        if (day.date === today) {
          return {
            ...day,
            count: 1,
            level: 1
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
              onAddShower={addShower}
              onReset={resetChart}
              hasShoweredToday={hasShoweredToday}
            />

            <ShowerTracker data={data} />
            
            <div className="text-center mb-8">

            </div>

            <div className="pt-8 border-t border-blue-200">
              <StinkyFriendButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}