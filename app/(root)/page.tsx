import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import { SearchParams } from 'next/dist/server/request/search-params';
import Link from 'next/link';

const questions = [
  {
    _id: '1',
    title: 'How to learn Next.js?',
    tags: [
      { _id: 1, name: 'nextjs' },
      { _id: 2, name: 'JavaScript' },
    ],
    author: { _id: '1', name: 'John Doe' },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'What is the best way to manage state in React?',
    tags: [
      { _id: 3, name: 'react' },
      { _id: 4, name: 'JavaScript' },
    ],
    author: { _id: '2', name: 'Jane Smith' },
    upvotes: 20,
    answers: 8,
    views: 200,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = '' } = await searchParams;

  const filterQuestions = questions.filter((question) =>
    question.title.toLocaleLowerCase().includes(query?.toLocaleLowerCase())
  );

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
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Serch questions..."
          otherClasses="flex-1"
        />
      </section>
      {/* HomeFilter */}
      <div className="flex flex-col gap-6 mt-10 w-full">
        {filterQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
