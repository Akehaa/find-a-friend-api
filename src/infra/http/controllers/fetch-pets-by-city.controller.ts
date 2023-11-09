import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { PetPresenter } from '../presenters/pet-presenter';
import { FetchPetsByCityUseCase } from '@/domain/main/application/use-cases/fetch-pets-by-city';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/pets/city/:city')
export class FetchPetsByCityController {
  constructor(private fetchPetByCity: FetchPetsByCityUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
    @Param('city') city: string,
  ) {
    const result = await this.fetchPetByCity.execute({
      city,
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const pets = result.value.pets;

    return { pets: pets.map(PetPresenter.toHTTP) };
  }
}
