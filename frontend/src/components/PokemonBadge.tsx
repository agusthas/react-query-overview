import { Badge, MantineColor } from '@mantine/core';
import { useMemo } from 'react';

export const PokemonBadge = ({ type }: { type: string }) => {
  const badgeColor = useMemo((): MantineColor => {
    const typeUppercase = type.toUpperCase();
    switch (typeUppercase) {
      case 'GRASS':
        return 'green';
      case 'BUG':
        return 'lime';
      case 'DARK':
        return 'dark';
      case 'DRAGON':
        return 'grape';
      case 'ELECTRIC':
        return 'yellow';
      case 'FAIRY':
      case 'GROUND':
        return 'pink';
      case 'FIGHTING':
        return 'red';
      case 'FIRE':
      case 'ROCK':
        return 'orange';
      case 'FLYING':
      case 'WATER':
        return 'blue';
      case 'GHOST':
      case 'POISON':
      case 'GROUND':
        return 'violet';
      case 'ICE':
        return 'cyan';
      case 'NORMAL':
      case 'STEEL':
        return 'gray';
      default:
        return '#FFF';
    }
  }, [type]);

  return (
    <Badge color={badgeColor} variant="light">
      {type}
    </Badge>
  );
};
