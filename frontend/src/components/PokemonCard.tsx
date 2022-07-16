import { Card, Group, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import { Pokemon } from '../modules/pokemons/types';
import { PokemonBadge } from './PokemonBadge';

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  return (
    <Card withBorder p="lg" radius="md">
      <Group position="apart" align="start">
        <div>
          <Title order={3}>{pokemon.name?.englishName}</Title>
          <Text color="dimmed">{pokemon.name?.japaneseName}</Text>
        </div>
        <Group spacing="xs" mt="xs">
          <PokemonBadge type={pokemon.types[0]} />
        </Group>
      </Group>

      <SimpleGrid mt="md" cols={3}>
        {Object.entries(pokemon.base || []).map(([key, value]) => (
          <div key={key}>
            <Text weight={700} align="center">
              {value}
            </Text>
            <Text size="xs" color="dimmed" align="center">
              {key.toUpperCase()}
            </Text>
          </div>
        ))}
      </SimpleGrid>
    </Card>
  );
};

export default PokemonCard;
