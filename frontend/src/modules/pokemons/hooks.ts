import { useInfiniteQuery, useQuery } from 'react-query';
import fetcher from '../../config/fetcher';
import { Info, Pokemon } from './types';

type PaginatedPokemonResponse = {
  pokemons: Pokemon[];
  info: Info;
};

const fetchPokemons = async (page = 1, limit = 20) => {
  const { data } = await fetcher.get<PaginatedPokemonResponse>('/pokemons', {
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
  return useQuery<PaginatedPokemonResponse, Error>(
    ['paginatedPokemons', page, limit],
    () => fetchPokemons(page, limit),
    {
      keepPreviousData: true,
      staleTime: 5000, // in ms
    }
  );
};

export const useInfinitePokemons = () => {
  return useInfiniteQuery<PaginatedPokemonResponse, Error>(
    'infiniteProjects',
    ({ pageParam }) => fetchPokemons(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.info.nextPage,
      getPreviousPageParam: (firstPage) => firstPage.info.prevPage,
    }
  );
};
