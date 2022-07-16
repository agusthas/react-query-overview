import {
  Alert,
  Button,
  Code,
  Group,
  Loader,
  Pagination,
  Select,
  SimpleGrid,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PokemonBadge } from '../components/PokemonBadge';
import PokemonCard from '../components/PokemonCard';
import {
  useInfinitePokemons,
  usePaginatedPokemons,
} from '../modules/pokemons/hooks';

const PokemonPagination = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { status, data, error, isFetching, isPreviousData } =
    usePaginatedPokemons({
      page,
      limit: pageSize,
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
            <Group my="md" position="apart">
              <Pagination
                page={page}
                onChange={setPage}
                total={data.info.lastPage}
              />

              <Select
                data={['20', '40', '50', '100']}
                value={pageSize.toString()}
                onChange={(v) => setPageSize(v ? Number(v) : pageSize)}
              />

              <Group>
                <Button
                  size="xs"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Prev
                </Button>
                <Text>{page}</Text>
                <Button
                  size="xs"
                  onClick={() =>
                    setPage((p) => (data.info.lastPage !== page ? p + 1 : p))
                  }
                  disabled={isPreviousData || data.info.lastPage === page}
                >
                  Next
                </Button>
              </Group>
            </Group>

            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Nihongo</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {data.pokemons.map((pokemon) => (
                  <tr key={pokemon.id}>
                    <td>{pokemon.id}</td>
                    <td>{pokemon.name?.englishName}</td>
                    <td>{pokemon.name?.japaneseName}</td>
                    <td>
                      <Group>
                        {pokemon.types.map((type) => (
                          <PokemonBadge type={type} key={type} />
                        ))}
                      </Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
};

const InfinitePokemonPagination = () => {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfinitePokemons();

  // fetch nextPage when button is in view
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

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
          <div>
            <SimpleGrid cols={3}>
              {data.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.pokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                  ))}
                </Fragment>
              ))}
            </SimpleGrid>

            <Group mt="md">
              <Button
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? 'Loading More...'
                  : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
              </Button>

              {isFetching && !isFetchingNextPage && (
                <Group>
                  <Text>Fetching...</Text>
                  <Loader />
                </Group>
              )}
            </Group>
          </div>
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
