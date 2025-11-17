import ROUTES from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import TagCard from '@/components/cards/TagCard';

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: '1',
      title: 'How to create a custom hook in React',
    },
    {
      _id: '2',
      title: 'What is the difference between let and var in JavaScript?',
    },
    {
      _id: '3',
      title: 'How to optimize performance in React applications?',
    },
    {
      _id: '4',
      title: 'What are the new features in ES2021?',
    },
  ];

  const popularTags = [
    {
      _id: '1',
      name: 'javaScript',
      questions: 1200,
    },
    {
      _id: '2',
      name: 'react',
      questions: 950,
    },
    {
      _id: '3',
      name: 'typescript',
      questions: 800,
    },
    {
      _id: '4',
      name: 'nextjs',
      questions: 700,
    },
    {
      _id: '5',
      name: 'nodejs',
      questions: 650,
    },
  ];

  return (
    <section className="max-xl:hidden top-0 right-0 sticky flex flex-col gap-6 shadow-light-300 dark:shadow-none p-6 pt-36 light-border border-l w-[350px] h-screen overflow-y-auto custom-scrollbar background-light900_dark200">
      <div>
        <h3 className="text-dark200_light900 h3-bold">Top Questions</h3>
        <div className="flex flex-col gap-[30px] mt-7 w-full">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex justify-between items-center gap-7 cursor-pointer"
            >
              <p className="text-dark500_light700 body-medium">{title}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt="Chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-dark200_light900 h3-bold">Popular Tags</h3>
        <div className="flex flex-col gap-4 mt-7">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={name}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
