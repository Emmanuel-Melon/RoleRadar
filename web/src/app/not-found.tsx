import { Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-24">
      <div className="space-y-8">
        <h2 className="text-6xl font-bold text-primary">404</h2>
        
        <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Oops! The page you're looking for seems to have wandered off into the digital void.
            </p>
            
            <p className="text-lg text-muted-foreground">
              Don't worry though - you can head back home and explore other interesting sections of the site.
            </p>

            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Error Code</h3>
              <p className="text-lg">404 Not Found</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Suggestion</h3>
              <p className="text-lg">
                Check the URL or navigate using the menu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

