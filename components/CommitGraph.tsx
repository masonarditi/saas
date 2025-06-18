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
      <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm">
        <div className="animate-pulse">
          <div className="h-32 bg-sky-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm">
      <ActivityCalendar
        data={data}
        colorScheme="light"
        theme={{
          light: ['#ffffff', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9'],
          dark: ['#ffffff', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9']
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