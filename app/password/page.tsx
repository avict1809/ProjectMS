"use client"

import type React from "react"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react"

export default function PasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // Get the email from the URL query parameter
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    } else {
      // If no email is provided, redirect back to the login page
      router.push("/")
    }
  }, [searchParams, router])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, you would handle authentication here
    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      // After successful authentication, you would redirect to the dashboard
      // For now, we'll just log the credentials
      console.log("Login attempt with:", { email, password })
      setIsLoading(false)

      // In a real app, redirect to dashboard after successful login
      // router.push("/dashboard")
    }, 1500)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="h-12 w-12 rounded-full bg-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 65" fill="none" className="h-full w-full">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000000" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Enter your password</h1>
          <p className="text-sm text-gray-400">
            Please enter your password for <span className="font-medium text-gray-300">{email}</span>
          </p>
        </div>

        <Card className="border-gray-800 bg-gray-950 text-white shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg">Password</CardTitle>
            <CardDescription className="text-gray-400">Enter your password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-800 bg-gray-900 pr-10 text-white placeholder:text-gray-500 focus-visible:ring-gray-700"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <Link href="#" className="text-xs text-gray-400 hover:text-white">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isLoading}>
                <LockKeyhole className="mr-2 h-4 w-4" />
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </CardFooter>
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

