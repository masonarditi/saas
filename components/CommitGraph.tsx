'use client';

import { useState, useEffect } from 'react';
import ActivityCalendar from 'react-activity-calendar';

// Generate empty data for the last year
function generateEmptyData() {
  const data = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    data.push({
      date: d.toISOString().split('T')[0],
      count: 0,
      level: 0
    });
  }
  
  return data;
}

export default function CommitGraph() {
  const [data, setData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setData(generateEmptyData());
    setIsLoaded(true);
    // Set default selected date to today
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  const addCommit = () => {
    if (!selectedDate) return;

    setData(prevData => 
      prevData.map(day => {
        if (day.date === selectedDate) {
          const newCount = day.count + 1;
          const newLevel = newCount === 0 ? 0 : Math.min(Math.floor(newCount / 2) + 1, 4);
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

  if (!isLoaded) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Interactive Commit Graph</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Interactive Commit Graph</h2>
      
      {/* Controls */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex flex-col gap-2">
            <label htmlFor="date-picker" className="text-sm font-medium text-gray-700">
              Select Date:
            </label>
            <input
              id="date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={addCommit}
              disabled={!selectedDate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Commit
            </button>
            
            <button
              onClick={resetChart}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Reset Chart
            </button>
          </div>
        </div>
        
        {selectedDate && (
          <div className="mt-3 text-sm text-gray-600">
            Selected: {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        )}
      </div>

      {/* Activity Calendar */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ActivityCalendar
          data={data}
          theme={{
            light: ['#f0f9ff', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9'],
            dark: ['#0c1420', '#0c4a6e', '#075985', '#0284c7', '#0ea5e9'],
          }}
          labels={{
            months: [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            totalCount: '{{count}} contributions in the last year',
            legend: {
              less: 'Less',
              more: 'More'
            }
          }}
        />
      </div>
    </div>
  );
}