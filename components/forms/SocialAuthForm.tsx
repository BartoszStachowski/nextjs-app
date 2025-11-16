'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import ROUTES from '@/constants/routes';

const SocialAuthForm = () => {
  const buttonClass =
    'flex-1 px-4 py-3.5 rounded-lg min-h-12 text-dark200_light800 background-dark400_light900 body-medium';

  const handleSignIn = async (provider: 'github' | 'google') => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      console.log(error);
      toast.error('Sign-in Failed', {
        position: 'top-right',
        richColors: true,
        description:
          error instanceof Error
            ? error.message
            : 'An error occured during sign-in',
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5 mt-10">
      <Button className={buttonClass} onClick={() => handleSignIn('github')}>
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>

      <Button className={buttonClass} onClick={() => handleSignIn('google')}>
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
