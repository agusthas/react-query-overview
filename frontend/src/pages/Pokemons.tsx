import {
  Alert,
  Button,
  Code,
  Divider,
  Group,
  Loader,
  MultiSelect,
  NativeSelect,
  SimpleGrid,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { Fragment } from 'react';
import { LoadMoreButton } from '../components/LoadMoreButton';
import { PokemonCard } from '../components/PokemonCard';
import {
  useInfinitePokemons,
  usePaginatedPokemons,
} from '../modules/pokemons/hooks';
import { PokemonParams, POKEMON_TYPES_DATA } from '../modules/pokemons/types';

const MUTABLE_TYPES = POKEMON_TYPES_DATA.map<string>((t) => t);
const POKEMON_GRID_COLUMN = 4;

const PokemonPagination = () => {
  const [params, setParams] = useSetState<PokemonParams>({
    page: 1,
    limit: 20,
    types: [],
  });

  const { status, data, error, isFetching, isPreviousData } =
    usePaginatedPokemons({
      page: params.page,
      limit: params.limit,
      types: params.types,
    });

  return (
    <div>
      <Title order={2} mb="md">
        Pokemon Pagination
      </Title>
      <Text mb="md">
        In this example, each page of data remains visible as the next page is
        fetched with help of <Code>keepPreviousData</Code>. Each page is cached
        as normal query too, so when navigating through pages, if no refetch, it
        will show instantaneously.
      </Text>

      <div style={{ paddingBottom: 30 }}>
        {status === 'loading' && (
          <Group position="center">
            <Loader />
          </Group>
        )}
        {status === 'error' && (
          <Alert title="Bummer!" color="red">
            {error.message}
          </Alert>
        )}
        {status === 'success' && data && (
          <>
            <Group my="md" spacing={30}>
              <NativeSelect
                label="Limit"
                description="Limit per page"
                data={['20', '40', '50', '100']}
                value={params.limit.toString()}
                onChange={(e) => setParams({ limit: parseInt(e.target.value) })}
              />

              <MultiSelect
                label="Types"
                description="Pokemon Types"
                data={MUTABLE_TYPES}
                value={params.types}
                onChange={(types) => setParams({ types })}
                maxSelectedValues={2}
                searchable
                clearable
              />
            </Group>

            <Divider my="sm" />
            <Group mb="md" spacing="xs">
              <Button
                size="xs"
                onClick={() =>
                  setParams({ page: Math.max(params.page - 1, 1) })
                }
                disabled={params.page === 1}
              >
                Prev
              </Button>
              <Text>{params.page}</Text>
              <Button
                size="xs"
                onClick={() =>
                  setParams({
                    page:
                      data.info.lastPage !== params.page
                        ? params.page + 1
                        : params.page,
                  })
                }
                disabled={isPreviousData || data.info.lastPage === params.page}
              >
                Next
              </Button>
            </Group>

            <SimpleGrid cols={POKEMON_GRID_COLUMN} mt="md">
              {data.results.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </SimpleGrid>
          </>
        )}
      </div>
    </div>
  );
};

const InfinitePokemonPagination = () => {
  const [params, setParams] = useSetState<PokemonParams>({
    page: 1, // FIXME: not used in this component afaik
    limit: 10,
    types: [],
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfinitePokemons({
    limit: params.limit,
    types: params.types,
  });

  return (
    <div>
      <Title order={2} mb="md">
        Infinite Pokemon Pagination
      </Title>

      <Text mb="md">
        In this example, the pagination is handled by React-Query, so the
        pagination is not visible in the UI. This creates an infinite scroll of
        the data. By default the query fetch only 20 pokemons per page, and it
        is possible to change this value in the <Code>useInfinitePokemons</Code>{' '}
        hook.
      </Text>

      <div style={{ paddingBottom: 30 }}>
        {status === 'loading' && (
          <Group position="center">
            <Loader />
          </Group>
        )}
        {status === 'error' && (
          <Alert title="Bummer!" color="red">
            {error.message}
          </Alert>
        )}
        {status === 'success' && data && (
          <>
            <Group my="md" spacing={30}>
              <NativeSelect
                label="Limit"
                description="Limit per page"
                data={['10', '20', '40', '50', '100']}
                value={params.limit.toString()}
                onChange={(e) => setParams({ limit: Number(e.target.value) })}
              />

              <MultiSelect
                label="Types"
                description="Pokemon Types"
                data={MUTABLE_TYPES}
                value={params.types}
                onChange={(types) => setParams({ types })}
                maxSelectedValues={2}
                searchable
                clearable
              />
            </Group>

            <Divider my="sm" />

            <SimpleGrid cols={POKEMON_GRID_COLUMN} mt="md">
              {data.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                  ))}
                </Fragment>
              ))}
            </SimpleGrid>

            <Group mt="md">
              <LoadMoreButton
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />

              {isFetching && !isFetchingNextPage && (
                <Group>
                  <Text>Fetching...</Text>
                  <Loader />
                </Group>
              )}
            </Group>
          </>
        )}
      </div>
    </div>
  );
};

const PokemonsPage = () => {
  return (
    <div>
      <Title order={2}>Pokemons Page</Title>
      <Tabs mt="md">
        <Tabs.Tab label="Paginated Queries" color="violet">
          <PokemonPagination />
        </Tabs.Tab>
        <Tabs.Tab label="Infinite Queries" color="yellow">
          <InfinitePokemonPagination />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default PokemonsPage;
