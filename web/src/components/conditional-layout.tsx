"use client";
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { AppSidebar } from './app-sidebar'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/auth')

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <>
      <AppSidebar />
      <main className="grow">
        <Navbar />
        <div className="flex items-center justify-between rounded-lg bg-transparent">
          <button
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
        <div>{children}</div>
      </main>
    </>
  )
}
