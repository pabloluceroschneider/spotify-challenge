import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Query {
  q: string;
  year?: number;
  offset?: number;
}

interface Params {
  initialQuery: Query;
}

export const useQueryParams = ({ initialQuery }: Params) => {
  const [query, setQuery] = useState<Query>(initialQuery);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const replaceURLSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleQuery = (query: Record<keyof Query, any>) => {
    const [[key, value]] = Object.entries(query);

    replaceURLSearchParams(key, value);

    return setQuery((prevQ) => ({
      ...prevQ,
      [key]: value,
    }));
  };

  return {
    query,
    handleQuery,
  };
};
