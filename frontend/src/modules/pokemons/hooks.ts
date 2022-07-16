import { useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import fetcher from '../../config/fetcher';
import { Info, Pokemon, PokemonType } from './types';

type PaginatedPokemonResponse = {
  results: Pokemon[];
  info: Info;
};

const fetchPokemons = async (page = 1, limit = 20, types: string[] = []) => {
  const { data } = await fetcher.get<PaginatedPokemonResponse>('/pokemons', {
    params: {
      page,
      limit,
      ...(types.length > 0 && { types: types.join(',') }),
    },
  });

  return data;
};

export const usePaginatedPokemons = ({
  page,
  limit,
  types = [],
}: {
  page: number;
  limit: number;
  types?: string[];
}) => {
  return useQuery<PaginatedPokemonResponse, Error>(
    ['paginatedPokemons', page, limit, types],
    () => fetchPokemons(page, limit, types),
    {
      keepPreviousData: true,
      staleTime: 5000, // in ms
    }
  );
};

export const useInfinitePokemons = ({
  limit,
  types = [],
}: {
  limit: number;
  types?: string[];
}) => {
  return useInfiniteQuery<PaginatedPokemonResponse, Error>(
    ['infiniteProjects', { limit, types }],
    ({ pageParam }) => fetchPokemons(pageParam, limit, types),
    {
      getNextPageParam: (lastPage) => lastPage.info.nextPage,
      getPreviousPageParam: (firstPage) => firstPage.info.prevPage,
    }
  );
};
