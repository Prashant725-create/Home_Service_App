"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@descope/nextjs-sdk/client";
import GlobalApi from "@/app/_services/GlobalApi";
import BusinessInfo from '../_components/BusinessInfo';
import SuggestedBusinessList from '../_components/SuggestedBusinessList';
import Businessdescription from '../_components/Businessdescription';


export default function BusinessDetail({ params }) {
  const router = useRouter();

  // Unwrap params promise (hook-like API)
  const resolvedParams = React.use(params);
  const businessId = resolvedParams?.businessId;

  // Descope session hook
  const { isAuthenticated, isSessionLoading } = useSession();
  const [business, setBusiness] = useState(null);

  // 1) Redirect effect: redirect unauthenticated users to sign-in
  useEffect(() => {
    if (isSessionLoading) return;
    if (!isAuthenticated) {
      router.push("/sigin"); // adjust path if needed
    }
  }, [isAuthenticated, isSessionLoading, router]);

  // 2) Fetch business details effect
  useEffect(() => {
    // Only fetch when we have a businessId and user is authenticated
    if (!businessId) return;
    if (!isAuthenticated) return;

    let mounted = true;
    GlobalApi.getBusinessById(businessId)

      .then((resp) => {
        if (!mounted) return;
        setBusiness(resp.businessList);
        // if you want to store it: setState here (you'll need useState)
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch business:", err);
      });

    return () => {
      mounted = false;
    };
  }, [businessId, isAuthenticated]);

  // UI / early returns are allowed AFTER all hooks are declared
  if (isSessionLoading) return <p>Loading session...</p>;
  if (!isAuthenticated) return <p>Redirecting to sign in…</p>;

  return (
    <div className='py-8 md:py-20 px-10 md:px-36'>
      <BusinessInfo business={business}/>

      <div className='grid grid-cols-3 mt-16'> 
        <div className='col-span-4 md:col-span-2 order-last md:order-first'>
          <Businessdescription business={business}/>
        </div>
          
        <div className=''>
          <SuggestedBusinessList 
            category={business?.category?.name} 
            business={business}  
          />
        </div>
    
      </div>
    </div>
  );
}
