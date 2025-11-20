import QuestionCard from '@/components/cards/QuestionCard';
import HomeFiler from '@/components/filters/HomeFiler';
import LocalSearch from '@/components/search/LocalSearch';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import Link from 'next/link';

const questions = [
  {
    _id: '1',
    title: 'How to learn Next.js?',
    tags: [
      { _id: 1, name: 'nextjs' },
      { _id: 2, name: 'JavaScript' },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    },
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
    author: {
      _id: '2',
      name: 'Jane Smith',
      image: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    },
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
  const { query = '', filter = '' } = await searchParams;

  const queryLower = query?.toLocaleLowerCase() ?? '';
  const filterLower = filter?.toLocaleLowerCase() ?? '';

  const filterQuestions = questions.filter((question) => {
    const matchesQuery =
      queryLower === '' ||
      question.title.toLocaleLowerCase().includes(queryLower);

    const matchesFilter =
      filterLower === '' ||
      filterLower === 'all' ||
      question.tags?.some(
        (tag) => tag.name.toLocaleLowerCase() === filterLower
      );

    return matchesQuery && matchesFilter;
  });

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
      <HomeFiler />
      <div className="flex flex-col gap-6 mt-10 w-full">
        {filterQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
