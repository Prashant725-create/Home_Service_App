"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image"; 
import { Button } from "@/components/ui/button";
import { useSession } from '@descope/nextjs-sdk/client';

 
function Header() {
  const router = useRouter();
  const { isAuthenticated } = useSession();
  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-8'> 
        <Image src='/logo.svg' alt='logo'
        width={180} height={100}/>
        <div className='md:flex items-center gap-6 hidden'> 
          <h2 className='hover:scale-105 hover: text-primary cursor-pointer'>Home</h2>
          <h2 className='hover:scale-105 hover: text-primary cursor-pointer'>Services</h2>
          <h2 className='hover:scale-105 hover: text-primary cursor-pointer'>About Us</h2>
        </div>
        {!isAuthenticated && (
        <div>
          <Button variant="outline" className='rounded-full' onClick={() => router.push('/signin')}>
            <h2 className='hover:scale-105 hover: text-primary cursor-pointer'>Login / Sign Up</h2>
          </Button>
        </div>
        )}
      </div>
    </div>
  )
}

export default Header