import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;
}
