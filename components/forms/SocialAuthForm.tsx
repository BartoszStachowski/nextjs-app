import { Button } from '@/components/ui/button';
import Image from 'next/image';

const SocialAuthForm = () => {
  const buttonClass =
    'flex-1 px-4 py-3.5 rounded-lg min-h-12 text-dark200_light800 background-dark400_light900 body-medium';
  return (
    <div className="flex flex-wrap gap-2.5 mt-10">
      <Button className={buttonClass}>
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>

      <Button className={buttonClass}>
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
