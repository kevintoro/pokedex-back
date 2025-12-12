import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    return this.pokemonModel.create(createPokemonDto);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findOne({ _id: new ObjectId(term) });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon not found with term: ${term}`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    await pokemon.updateOne(updatePokemonDto);
    return {
      ...pokemon.toJSON(),
      ...updatePokemonDto,
    };
  }

  async remove(id: string) {
    const result = await this.pokemonModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Pokemon not found with id: ${id}`);
    }
    return {
      message: 'Pokemon deleted successfully',
    };
  }
}
