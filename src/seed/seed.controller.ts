import {
  Controller,
  DefaultValuePipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  executeSeed(
    @Query(
      'total',
      new DefaultValuePipe(10),
      new ParseIntPipe({ optional: true }),
    )
    total: number,
  ) {
    return this.seedService.executeSeed(total);
  }
}
