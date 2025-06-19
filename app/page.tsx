 
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ShowerTracker, { generateEmptyData } from '@/components/CommitGraph';
import ShowerTrackerControls from '@/components/CommitGraphControls';
import StinkyFriendButton from '@/components/StinkyFriendButton';
import CapCheckPopup from '@/components/CapCheckPopup';
import MajorSelectionPopup from '@/components/MajorSelectionPopup';
import ElonEntryScreen from '@/components/ElonEntryScreen';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [showElonEntry, setShowElonEntry] = useState(true);
  const [showMajorPopup, setShowMajorPopup] = useState(false);
  const [showCapPopup, setShowCapPopup] = useState(false);

  useEffect(() => {
    setData(generateEmptyData());
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const hasShoweredToday = data.find(day => day.date === today)?.count > 0;

  const handleYesClick = () => {
    if (hasShoweredToday) return;
    setShowCapPopup(true);
  };

  const actuallyAddShower = () => {
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
    setShowCapPopup(false);
  };

  const resetChart = () => {
    setData(generateEmptyData());
  };

  const handleEnterMatrix = () => {
    setShowElonEntry(false);
    setShowMajorPopup(true);
  };

  const handleSelectCS = () => {
    setShowMajorPopup(false);
  };

  // Show Elon entry screen first
  if (showElonEntry) {
    return (
      <ElonEntryScreen onEnterMatrix={handleEnterMatrix} />
    );
  }

  // Show major selection popup
  if (showMajorPopup) {
    return (
      <MajorSelectionPopup
        isOpen={showMajorPopup}
        onSelectCS={handleSelectCS}
      />
    );
  }

  // Show main app (when both popups are closed)
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="container mx-auto py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-16">
              <h1 className="text-4xl font-semibold text-slate-800 mb-6 tracking-tight">
                🚿 Shower as a Service (SaaS)
              </h1>
              <div className="mb-6">
                <a 
                  href="https://x.com/createdbymason/status/1935433850664153529"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mx-auto w-fit hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <Image
                    src="/elon.jpeg"
                    alt="Elon"
                    width={300}
                    height={300}
                    className="mx-auto"
                  />
                </a>
              </div>
            </header>
            
            <div className="space-y-8">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <ShowerTracker data={data} />
                </div>
                
                <div className="lg:w-64 w-full">
                  <ShowerTrackerControls
                    onAddShower={handleYesClick}
                    onReset={resetChart}
                    hasShoweredToday={hasShoweredToday}
                  />
                </div>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-sm text-slate-600">
                  Aim for at least one shower per day for optimal hygiene
                </p>
              </div>

              <div className="pt-8 border-t border-blue-200">
                <StinkyFriendButton />
              </div>
            </div>
          </div>
        </div>

        <CapCheckPopup
          isOpen={showCapPopup}
          onClose={() => setShowCapPopup(false)}
          onConfirm={actuallyAddShower}
        />
      </main>
    </>
  );
}