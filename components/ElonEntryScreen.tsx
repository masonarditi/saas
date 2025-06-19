import Image from 'next/image';

interface ElonEntryScreenProps {
  onEnterMatrix: () => void;
}

export default function ElonEntryScreen({ onEnterMatrix }: ElonEntryScreenProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        <div className="mb-8">
          <Image
            src="/elon.jpeg"
            alt="Elon"
            width={400}
            height={400}
            className="mx-auto"
          />
        </div>
        
        <button
          onClick={onEnterMatrix}
          className="px-12 py-6 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-200 text-2xl font-bold shadow-lg hover:shadow-xl"
        >
          enter matrix
        </button>
      </div>
    </div>
  );
}