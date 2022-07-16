export interface Info {
  page: number;
  prevPage: number | null;
  nextPage: number | null;
  limit: number;
  lastPage: number;
  total: number;
}

export interface Pokemon {
  id: number;
  name: PokemonName | null;
  base: PokemonBase | null;
  types: string[];
}

export interface PokemonBase {
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

export interface PokemonName {
  englishName: string;
  japaneseName: string | null;
  chineseName: string | null;
  frenchName: string | null;
}

export const POKEMON_TYPES_DATA = [
  'Grass',
  'Poison',
  'Fire',
  'Flying',
  'Water',
  'Bug',
  'Normal',
  'Electric',
  'Ground',
  'Fairy',
  'Fighting',
  'Psychic',
  'Rock',
  'Steel',
  'Ice',
  'Ghost',
  'Dragon',
  'Dark',
] as const;

export type PokemonType = typeof POKEMON_TYPES_DATA[number];

export interface PokemonParams {
  page: number;
  limit: number;
  types: string[];
}
