import { GetPetInfoUseCase } from '@/domain/main/application/use-cases/get-pet-info';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { PetPresenter } from '../presenters/pet-presenter';

@Controller('/pets/:petId')
export class GetPetInfoController {
  constructor(private getPetInfo: GetPetInfoUseCase) {}

  @Get()
  async handle(@Param('petId') petId: string) {
    const result = await this.getPetInfo.execute({
      petId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { pet: PetPresenter.toHTTP(result.value.pet) };
  }
}
