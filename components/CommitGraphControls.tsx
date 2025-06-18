interface ShowerTrackerControlsProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
    onAddShower: () => void;
    onReset: () => void;
  }
  
  export default function ShowerTrackerControls({
    selectedDate,
    onDateChange,
    onAddShower,
    onReset
  }: ShowerTrackerControlsProps) {
    const getDateRange = () => {
      const today = new Date();
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      
      return {
        min: oneYearAgo.toISOString().split('T')[0],
        max: today.toISOString().split('T')[0]
      };
    };
  
    const { min, max } = getDateRange();
  
    return (
      <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="date-picker" className="text-sm font-medium text-slate-700">
              Select Date
            </label>
            <input
              id="date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="px-3 py-2 bg-sky-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-700 transition-all duration-200"
              min={min}
              max={max}
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onAddShower}
              disabled={!selectedDate}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
            >
              Add Shower
            </button>
            
            <button
              onClick={onReset}
              className="px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-all duration-200 text-sm font-medium border border-blue-200 shadow-sm hover:shadow-md"
            >
              Reset
            </button>
          </div>
        </div>
        
        {selectedDate && (
          <div className="mt-4 text-sm text-slate-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
            Selected: {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        )}
      </div>
    );
  }