interface CapCheckPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  export default function CapCheckPopup({ isOpen, onClose, onConfirm }: CapCheckPopupProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            stop the cap. dont lie to yourself.
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200 text-base font-medium w-full"
            >
              You're right...
            </button>
            
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-sky-500 text-white rounded text-xs hover:bg-sky-600 transition-all duration-200"
            >
              nah im fr
            </button>
          </div>
        </div>
      </div>
    );
  }