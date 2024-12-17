import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-600"
            >
              Home
            </Link>
            <Link 
              href="/jobs" 
              className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-600"
            >
              Jobs
            </Link>
            <Link 
              href="/candidates" 
              className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-600"
            >
              Candidates
            </Link>
            <Link 
              href="/applications" 
              className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-600"
            >
              Applications
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 