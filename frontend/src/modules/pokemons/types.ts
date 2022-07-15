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
