import Link from "next/link";

interface NavbarProps {
  userName?: string | null;
}

export function Navbar({ userName }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        {process.env.NEXT_PUBLIC_APP_NAME ?? "My App"}
      </Link>
      <div className="flex items-center gap-4">
        {userName ? (
          <>
            <span className="text-sm text-gray-600">{userName}</span>
            <Link href="/api/auth/signout" className="text-sm text-red-600 hover:text-red-800">
              Sign Out
            </Link>
          </>
        ) : (
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
