import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { PetPresenter } from '../presenters/pet-presenter';
import { FetchPetsByWeightUseCase } from '@/domain/main/application/use-cases/fetch-pets-by-weight';
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

@Controller('/pets/weight/:weight')
export class FetchPetsByWeightController {
  constructor(private fetchPetByWeight: FetchPetsByWeightUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
    @Param('weight') weight: string,
  ) {
    const result = await this.fetchPetByWeight.execute({
      weight,
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const pets = result.value.pets;

    return { pets: pets.map(PetPresenter.toHTTP) };
  }
}
