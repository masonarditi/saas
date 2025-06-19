interface ShowerTrackerControlsProps {
  onAddShower: () => void;
  onReset: () => void;
  hasShoweredToday: boolean;
}

export default function ShowerTrackerControls({
  onAddShower,
  onReset,
  hasShoweredToday
}: ShowerTrackerControlsProps) {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-medium text-slate-800">
        Did you shower today?
      </h2>
      
      {hasShoweredToday && (
        <div className="text-green-600 font-medium">
          ✅ You&rsquo;ve already showered today! Great job!
        </div>
      )}
      
      <div className="flex flex-col gap-4">
        <button
          onClick={onAddShower}
          disabled={hasShoweredToday}
          className={`px-6 py-3 rounded-lg transition-all duration-200 text-base font-medium shadow-sm hover:shadow-md ${
            hasShoweredToday 
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
              : 'bg-sky-500 text-white hover:bg-sky-600'
          }`}
        >
          Yes ✅
        </button>
        
        <button
          onClick={onReset}
          className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200 text-base font-medium shadow-sm hover:shadow-md"
        >
          Reset Chart
        </button>
      </div>
    </div>
  );
}