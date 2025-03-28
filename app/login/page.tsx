"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FireExtinguisher, Building2Icon, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, you might want to validate the email format
    // and check if the user exists before proceeding

    // Encode the email for the URL
    const encodedEmail = encodeURIComponent(email)

    // Navigate to the password page with the email as a query parameter
    router.push(`/password?email=${encodedEmail}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900  p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="h-12 w-12 rounded-full bg-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 65" fill="none" className="h-full w-full">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000000" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Sign in to ProjectMS</h1>
          <p className="text-sm text-gray-400">Enter your email to sign in or create an account</p>
        </div>

        <Card className="border-gray-800 bg-gray-950 text-white shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg">Sign in with Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="border-gray-800 bg-gray-900 hover:bg-gray-800">
                <FireExtinguisher className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-gray-800 bg-gray-900 hover:bg-gray-800">
                <Building2Icon className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-gray-800 bg-gray-900 hover:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M5 12a7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7 7 7 0 0 0-7 7Z" />
                  <path d="M5 12h2" />
                  <path d="M17 12h2" />
                  <path d="M5 12a7 7 0 0 0 7 7" />
                  <path d="M12 19a7 7 0 0 0 7-7" />
                </svg>
              </Button>
            </div> */}

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-gray-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-gray-950 px-2 text-gray-400">Or continue with</span>
              </div>
            </div> */}

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="border-gray-800 bg-gray-900 text-white placeholder:text-gray-500 focus-visible:ring-gray-700"
                />
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isLoading}>
                <Mail className="mr-2 h-4 w-4" />
                {isLoading ? "Loading..." : "Continue with Email"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-400">
          By signing in, you agree to our{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-white">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  )
}

