import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { PetPresenter } from '../presenters/pet-presenter';
import { FetchPetsByBreedUseCase } from '@/domain/main/application/use-cases/fetch-pets-by-breed';
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

@Controller('/pets/breed/:breed')
export class FetchPetsByBreedController {
  constructor(private fetchPetByBreed: FetchPetsByBreedUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
    @Param('breed') breed: string,
  ) {
    const result = await this.fetchPetByBreed.execute({
      breed,
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const pets = result.value.pets;

    return { pets: pets.map(PetPresenter.toHTTP) };
  }
}
