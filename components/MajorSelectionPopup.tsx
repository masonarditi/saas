import { useState } from 'react';
import StinkyFriendButton from './StinkyFriendButton';

interface MajorSelectionPopupProps {
  isOpen: boolean;
  onSelectCS: () => void;
}

export default function MajorSelectionPopup({ isOpen, onSelectCS }: MajorSelectionPopupProps) {
  const [showOtherMessage, setShowOtherMessage] = useState(false);

  if (!isOpen) return null;

  if (showOtherMessage) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center z-50">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-8">
            you dont need this bro. send it to a cs major instead.
          </h1>
          
          <StinkyFriendButton />
          
          <button
            onClick={() => setShowOtherMessage(false)}
            className="block mx-auto px-4 py-2 text-slate-500 hover:text-slate-700 text-sm underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          What&#39;s your major?
        </h1>
        
        <div className="flex gap-6 justify-center">
          <button
            onClick={onSelectCS}
            className="px-12 py-6 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-200 text-2xl font-bold shadow-lg hover:shadow-xl"
          >
            CS
          </button>
          
          <button
            onClick={() => setShowOtherMessage(true)}
            className="px-12 py-6 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200 text-2xl font-bold shadow-lg hover:shadow-xl"
          >
            Other
          </button>
        </div>
      </div>
    </div>
  );
}