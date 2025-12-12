import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import {
  PokeAPIResponse,
  PokemonResponse,
} from './interfaces/pokeapi-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/http-adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed(numberOfPokemons: number = 10) {
    // Delete all pokemons in the database before seeding
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}`,
    );
    const pokemonsToSave: CreatePokemonDto[] = data.results.map(
      (pokemon: PokemonResponse) => {
        const segments = pokemon.url.split('/');
        const no = Number(segments[segments.length - 2]);
        return {
          name: pokemon.name,
          no,
        };
      },
    );

    await this.pokemonModel.insertMany(pokemonsToSave);

    return {
      message: 'Seed executed successfully',
      data: `${pokemonsToSave.length} pokemons saved`,
    };
  }
}
