import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import Link from 'next/link';

const Home = async () => {
  return (
    <>
      <section className="flex sm:flex-row flex-col-reverse justify-between sm:items-center gap-4 w-full">
        <h1 className="text-dark100_light900 h1-bold">All Questions</h1>

        <Button
          className="px-4 py-3 min-h-11.5 text-light-900 primary-gradient"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      {/* TODO: Create LocalSearch component */}
      <section className="mt-11">LocalSearch</section>
      HomeFilter
      <div className="flex flex-col gap-6 mt-10 w-full">
        <p>Question Card 1</p>
        <p>Question Card 2</p>
        <p>Question Card 3</p>
        <p>Question Card 4</p>
      </div>
    </>
  );
};

export default Home;
