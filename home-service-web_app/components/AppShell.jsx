"use client";
import Header from "../app/_components/Header";
import { AuthProvider } from '@descope/nextjs-sdk';
import { usePathname } from 'next/navigation';

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isSignIn = pathname === '/signin';
  return (
    <AuthProvider projectId="P32zpUpcGHB0RaI1g5gQq0KetMqu">
      {isSignIn ? (
        <div>{children}</div>
      ) : (
        <div className="mx-6 md:mx-16">
          <Header />
          {children}
        </div>
      )}
    </AuthProvider>
  );
}
