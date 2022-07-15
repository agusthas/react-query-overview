import { useQuery } from 'react-query';
import fetcher from '../../config/fetcher';
import { Info, Pokemon } from './types';

const fetchPokemons = async (page = 1, limit = 20) => {
  const { data } = await fetcher.get('/pokemons', {
    params: {
      page,
      limit,
    },
  });

  return data;
};

export const usePaginatedPokemons = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery<
    {
      pokemons: Pokemon[];
      info: Info;
    },
    Error
  >(['pokemons', page, limit], () => fetchPokemons(page, limit), {
    keepPreviousData: true,
    staleTime: 5000, // in ms
  });
};
