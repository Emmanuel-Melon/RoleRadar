'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto max-w-7xl px-6 py-24">
      <div className="space-y-8">
        <h2 className="text-6xl font-bold text-primary">500</h2>
        
        <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Oops! Something went wrong on our end. We're working on fixing it.
            </p>
            
            <p className="text-lg text-muted-foreground">
              You can try refreshing the page or come back later.
            </p>

            <Button onClick={() => reset()}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Error Code</h3>
              <p className="text-lg">500 Internal Server Error</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Error Details</h3>
              <p className="text-lg">
                {error.message || "An unexpected error occurred"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

