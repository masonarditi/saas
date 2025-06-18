import CommitGraph from '@/components/CommitGraph';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <CommitGraph />
      </div>
    </main>
  );
}