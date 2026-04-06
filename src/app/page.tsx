import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">
        {process.env.NEXT_PUBLIC_APP_NAME ?? "My Next.js App"}
      </h1>
      <p className="text-gray-600 mb-8">A full-stack Next.js application</p>
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
