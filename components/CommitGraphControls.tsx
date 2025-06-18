interface ShowerTrackerControlsProps {
  onAddShower: () => void;
  onReset: () => void;
}

export default function ShowerTrackerControls({
  onAddShower,
  onReset
}: ShowerTrackerControlsProps) {
  return (
    <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm">
      <div className="text-center space-y-6">
        <h2 className="text-xl font-medium text-slate-800">
          Did you shower today?
        </h2>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onAddShower}
            className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-200 text-base font-medium shadow-sm hover:shadow-md"
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
    </div>
  );
}