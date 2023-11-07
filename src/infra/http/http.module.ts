import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { RegisterOrgUseCase } from '@/domain/main/application/use-cases/register-org';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateOrgUseCase } from '@/domain/main/application/use-cases/authenticate-org';
import { RegisterPetController } from './controllers/register-pet.controller';
import { RegisterPetUseCase } from '@/domain/main/application/use-cases/register-pet';
import { EditPetController } from './controllers/edit-pet.controller';
import { EditPetUseCase } from '@/domain/main/application/use-cases/edit-pet';
import { DeletePetController } from './controllers/delete-pet-controller';
import { DeletePetUseCase } from '@/domain/main/application/use-cases/delete-pet';
@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    RegisterPetController,
    EditPetController,
    DeletePetController,
  ],
  providers: [
    RegisterOrgUseCase,
    AuthenticateOrgUseCase,
    RegisterPetUseCase,
    EditPetUseCase,
    DeletePetUseCase,
  ],
})
export class HttpModule {}
