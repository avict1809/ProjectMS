"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function Error({
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
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full mx-auto p-6 text-center">
        <div className="rounded-lg bg-destructive/10 p-8 mb-6">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
          <p className="text-muted-foreground mb-6">
            We apologize for the inconvenience. Your connection might be a problem!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Return to dashboard</Link>
            </Button>
          </div>
          {error.digest && <p className="mt-4 text-xs text-muted-foreground">Error ID: {error.digest}</p>}
        </div>
      </div>
    </div>
  )
}

