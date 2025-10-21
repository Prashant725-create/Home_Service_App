"use client";

// 1. ALL IMPORTS ARE CONSOLIDATED AT THE TOP
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useDescope, useSession, useUser } from '@descope/nextjs-sdk/client';

import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";
import GlobalApi from "./_services/GlobalApi";

// The component is now the default export
export default function Home() {
  // 2. ALL HOOKS (STATE AND AUTH) ARE GROUPED TOGETHER
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isUserLoading } = useUser();
  const sdk = useDescope();

  const [categoryList, setCategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);

  // 3. LOGOUT HANDLER IS ADDED
  const handleLogout = useCallback(() => {
    sdk.logout();
  }, [sdk]);

  // useEffect for fetching data remains the same
  useEffect(() => {
    getCategoryList();
    getAllBusinessList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.categories);
    });
  };

  const getAllBusinessList = () => {
    GlobalApi.getAllBusinessList().then(resp => {
      setBusinessList(resp.businessList);
    });
  };

  // 4. ADD A LOADING STATE CHECK AT THE TOP
  if (isSessionLoading || isUserLoading) {
    return <p>Loading...</p>;
  }

  // 5. THE MAIN RETURN USES 'isAuthenticated' TO RENDER CONDITIONALLY
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        {/* === AUTHENTICATION UI === */}
        <div className="w-full flex justify-between items-center">
          {isAuthenticated ? (
            <div>
              <p className="text-lg">Hello, {user.name}!</p>
            </div>
          ) : (
            <p className="text-lg">Welcome! Please log in.</p>
          )}
          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
        {/* ======================= */}

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.js
            </code>.
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <CategoryList categoryList={categoryList} />
      <BusinessList businessList={businessList} title={'Popular Business'} />

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* ... your footer links ... */}
      </footer>
    </div>
  );
}