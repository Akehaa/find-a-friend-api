import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { RegisterPetUseCase } from '@/domain/main/application/use-cases/register-pet';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

const registerPetBodySchema = z.object({
  name: z.string(),
  city: z.string(),
  about: z.string(),
  age: z.string(),
  weight: z.string(),
  breed: z.string(),
  size: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(registerPetBodySchema);

type RegisterPetBodySchema = z.infer<typeof registerPetBodySchema>;

@Controller('/pets')
@UseGuards(JwtAuthGuard)
export class RegisterPetController {
  constructor(private registerPet: RegisterPetUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: RegisterPetBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, about, city, age, weight, breed, size } = body;
    const orgId = user.sub;

    const result = await this.registerPet.execute({
      orgId: orgId,
      city,
      name,
      about,
      age,
      weight,
      breed,
      size,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
