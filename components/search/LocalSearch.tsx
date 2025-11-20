'use client';
import Image from 'next/image';
import { Input } from '../ui/input';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(query || '');

  const previousSearchRef = useRef(searchQuery);

  useEffect(() => {
    if (previousSearchRef.current === searchQuery) return;

    previousSearchRef.current = searchQuery;

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['query'],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathName]);
  return (
    <div
      className={` flex items-center gap-4 px-4 rounded-lg min-h-14 background-light800_darkgradient grow ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="Search Icon"
        className="cursor-pointer"
      />

      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent! shadow-none border-none outline-none text-dark400_light700 paragraph-regular no-focus"
      />
    </div>
  );
};

export default LocalSearch;
