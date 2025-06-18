/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import ActivityCalendar from 'react-activity-calendar';

// Generate sample data for the last year
function generateSampleData() {
  const data = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const count = Math.floor(Math.random() * 10); // Random commits 0-9
    const level = count === 0 ? 0 : Math.min(Math.floor(count / 2) + 1, 4);
    
    data.push({
      date: d.toISOString().split('T')[0],
      count: count,
      level: level
    });
  }
  
  return data;
}

export default function CommitGraph() {
  const [data, setData] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setData(generateSampleData());
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">GitHub-Style Commit Graph</h2>
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
      <h2 className="text-2xl font-bold mb-4">GitHub-Style Commit Graph</h2>
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