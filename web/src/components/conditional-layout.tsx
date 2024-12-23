"use client";
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { AppSidebar } from './app-sidebar'
import { useAuth } from '@/hooks/use-auth';
import { SplashScreen } from './SplashScreen';
import { Button } from './ui/button';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
// import NProgress from "nprogress";  
// import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import "nprogress/nprogress.css";


export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/auth')
  const { loading } = useAuth();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    router.refresh();
  };

  if (isAuthPage) {
    return <>{children}</>
  }

  if(loading) { return <SplashScreen />}

  return (
    <>
      <AppSidebar />
      <main className="grow">
        <Navbar />
        <div className="flex items-center justify-between p-2 bg-transparent border-b">
          <Button
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={handleBack}
            variant="ghost"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={handleRefresh}
            variant="ghost"
          >
            Refresh
            <RefreshCcw className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div>{children}</div>
      </main>
    </>
  )
}
