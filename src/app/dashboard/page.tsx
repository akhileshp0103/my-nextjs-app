import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOutAction } from "./actions";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{session.user?.email}</span>
          <form action={signOutAction}>
            <button
              type="submit"
              className="text-sm text-red-600 hover:text-red-800"
            >
              Sign Out
            </button>
          </form>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">
          Welcome, {session.user?.name ?? session.user?.email}!
        </h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Your items will appear here. Use the API to create and manage your items.
          </p>
        </div>
      </main>
    </div>
  );
}
