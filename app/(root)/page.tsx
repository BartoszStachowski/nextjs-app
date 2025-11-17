import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';

const page = async () => {
  const session = await auth();

  console.log(session);
  return (
    <>
      <h1 className="h1-bold">Welcome no Inter</h1>
      <h1 className="font-inter h1-bold">Welcome here Inter</h1>
      <h1 className="font-space-grotesk h1-bold">
        Welcome here SpaceGroteskVF
      </h1>
    </>
  );
};

export default page;
