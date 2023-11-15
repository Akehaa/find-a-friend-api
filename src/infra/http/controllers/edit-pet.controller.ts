import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { EditPetUseCase } from '@/domain/main/application/use-cases/edit-pet';

const editPetBodySchema = z.object({
  name: z.string(),
  city: z.string(),
  about: z.string(),
  age: z.string(),
  weight: z.string(),
  breed: z.string(),
  size: z.string(),
  attachments: z.array(z.string().uuid()),
});

const bodyValidationPipe = new ZodValidationPipe(editPetBodySchema);

type EditPetBodySchema = z.infer<typeof editPetBodySchema>;

@Controller('/pets/:id')
export class EditPetController {
  constructor(private editPet: EditPetUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditPetBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') petId: string,
  ) {
    const { name, city, about, age, weight, breed, size, attachments } = body;
    const orgId = user.sub;

    const result = await this.editPet.execute({
      name,
      city,
      about,
      age,
      weight,
      breed,
      size,
      orgId: orgId,
      attachmentsIds: attachments,
      petId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
