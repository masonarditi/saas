/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import ActivityCalendar from 'react-activity-calendar';

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

interface ShowerTrackerProps {
  data?: any[];
  onReset?: () => void;
}

export default function ShowerTracker({ data: externalData, onReset }: ShowerTrackerProps) {
  const [data, setData] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (externalData) {
      setData(externalData);
    } else {
      setData(generateEmptyData());
    }
    setIsLoaded(true);
  }, [externalData]);

  if (!isLoaded || !data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
        <div className="animate-pulse">
          <div className="h-32 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
      <ActivityCalendar
        data={data}
        theme={{
          light: ['#f8fafc', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8'],
          dark: ['#f8fafc', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8'],
        }}
        labels={{
          months: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ],
          weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          totalCount: '{{count}} showers in the last year',
          legend: {
            less: 'Less',
            more: 'More'
          }
        }}
      />
    </div>
  );
}

export { generateEmptyData };