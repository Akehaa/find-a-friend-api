import { RegisterOrgUseCase } from '@/domain/main/application/use-cases/register-org';
import { Public } from '@/infra/auth/public';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { OrgAlreadyExistsError } from '@/domain/main/application/use-cases/errors/org-already-exists-error';

const createAccountBodySchema = z.object({
  nameOfPersonResponsible: z.string(),
  email: z.string().email(),
  cep: z.string(),
  address: z.string(),
  whatsapp: z.string(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerOrg: RegisterOrgUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { nameOfPersonResponsible, email, cep, address, whatsapp, password } =
      body;

    const result = await this.registerOrg.execute({
      nameOfPersonResponsible,
      email,
      cep,
      address,
      whatsapp,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case OrgAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
