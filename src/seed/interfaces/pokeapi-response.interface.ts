export interface PokeAPIResponse {
  count: number;
  next: string;
  previous: null;
  results: PokemonResponse[];
}

export interface PokemonResponse {
  name: string;
  url: string;
}
