import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { RegisterOrgUseCase } from '@/domain/main/application/use-cases/register-org';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateOrgUseCase } from '@/domain/main/application/use-cases/authenticate-org';
import { RegisterPetController } from './controllers/register-pet.controller';
import { RegisterPetUseCase } from '@/domain/main/application/use-cases/register-pet';
@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    RegisterPetController,
  ],
  providers: [RegisterOrgUseCase, AuthenticateOrgUseCase, RegisterPetUseCase],
})
export class HttpModule {}
