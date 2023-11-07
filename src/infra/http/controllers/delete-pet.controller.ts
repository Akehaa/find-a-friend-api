import { DeletePetUseCase } from '@/domain/main/application/use-cases/delete-pet';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common';

@Controller('/pets/:id')
export class DeletePetController {
  constructor(private deletePet: DeletePetUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('id') petId: string) {
    const orgId = user.sub;

    const result = await this.deletePet.execute({
      petId,
      orgId: orgId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
