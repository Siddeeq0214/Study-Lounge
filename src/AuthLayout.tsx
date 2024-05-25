import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import FullScreenSpinner from '@/components/Spinners/FullScreenSpinner';

type LayoutProps = {
  children: ReactNode;
};

const requireAuth = (Component: React.FC<LayoutProps>) => {
  return ({ children } : LayoutProps) => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !error) {
        if (!user) {
          // Redirect to the homepage if the user is not authenticated
          router.push('/');
        } else if (user && !user.emailVerified) {
          // Redirect to the email verification page if the user's email is not verified
          router.push('/auth/verify-email');
        }
      }
    }, [user, loading, error, router]);

    if (loading) {
      // Show loading spinner or component while Firebase auth initializes
      return <FullScreenSpinner path={"Authenticating User..."} />;
    }

    if (error) {
      // Handle any errors that occur during Firebase auth initialization
      console.error(error);
      return <div>Error initializing Firebase authentication</div>;
    }

    if (!user || !user.emailVerified) {
      // Return null while the redirects in useEffect are being processed
      return null;
    }

    // Render the authenticated component only if the user is authenticated and email is verified
    return <Component>{children}</Component>;
  };
};

export default requireAuth;
