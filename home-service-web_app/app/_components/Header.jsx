"use client"
import React, { useEffect } from 'react';
// REMOVE THIS LINE: import { signIn, signOut, useSession } from 'next-auth/react' 
import { useRouter } from 'next/navigation';
import Image from "next/image"; 
import { Button } from "@/components/ui/button";
// Import useDescope for logout functionality
import { useSession, useDescope } from '@descope/nextjs-sdk/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

function Header() {
  const router = useRouter();
  // Descope returns 'isAuthenticated' and 'user' directly (no 'data' wrapper)
  const { isAuthenticated, user } = useSession();
  const { logout } = useDescope();

  useEffect(()=>{
    console.log("User Data:", user);
  },[user])

  const onLogout = async () => {
      await logout();
      router.push('/'); // Redirect after logout
  }

  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-8'> 
        <Image src='/logo.svg' alt='logo'
        width={180} height={100} />
        
        <div className='md:flex items-center gap-6 hidden'>
            <Link href={'/'} className='hover:scale-105 hover:text-primary cursor-pointer'>
                Home
            </Link>
            <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>
                Services
            </h2>
            <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>
                About Us
            </h2>
        </div>
      </div>

      <div>
          {isAuthenticated ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                {/* Descope users usually have 'picture' or 'image' */}
                <Image src={user?.picture || user?.image || '/placeholder-user.jpg'}
                        alt='user'
                        width={40}
                        height={40}
                        className='rounded-full cursor-pointer'
                        />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={'/mybooking'}>My Booking</Link> 
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => router.push('/signin')}>Login / Sign Up</Button>
          )}
      </div>

    </div>
  )
}

export default Header