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
      <div className="mb-6 p-4 bg-white rounded-lg shadow-lg border border-blue-100">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex flex-col gap-2">
            <label htmlFor="date-picker" className="text-sm font-medium text-slate-700">
              📅 Select Date:
            </label>
            <input
              id="date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={min}
              max={max}
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onAddShower}
              disabled={!selectedDate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              🚿 Add Shower
            </button>
            
            <button
              onClick={onReset}
              className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              🔄 Reset
            </button>
          </div>
        </div>
        
        {selectedDate && (
          <div className="mt-3 text-sm text-slate-600 bg-blue-50 px-3 py-2 rounded-lg">
            <span className="font-medium">Selected:</span> {new Date(selectedDate).toLocaleDateString('en-US', { 
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