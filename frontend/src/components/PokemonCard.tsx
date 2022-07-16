import { Card, Group, Text, Title } from '@mantine/core';
import { Fragment } from 'react';
import { Pokemon } from '../modules/pokemons/types';
import { PokemonBadge } from './PokemonBadge';

export const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <Card withBorder p="md" radius="md">
      <div>
        <Title order={3}>{pokemon.name?.englishName}</Title>
        <Text color="dimmed">{pokemon.name?.japaneseName}</Text>
      </div>

      <Group spacing="xs" mt="lg">
        {pokemon.types.map((type) => (
          <Fragment key={type}>
            <PokemonBadge type={type} />
          </Fragment>
        ))}
      </Group>
    </Card>
  );
};
