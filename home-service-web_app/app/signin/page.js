

"use client"; 

import { Descope } from '@descope/nextjs-sdk';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Descope
        flowId="sign-up-or-in"
        onSuccess={(e) => {
          console.log('Successfully logged in!', e.detail.user);
          // Redirect to the home page or a dashboard after success
          router.push('/');
        }}
        onError={(e) => console.log('Could not log in!')}
      />
    </div>
  );
};

export default Page;