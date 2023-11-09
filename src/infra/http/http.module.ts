import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { RegisterOrgUseCase } from '@/domain/main/application/use-cases/register-org';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AuthenticateOrgUseCase } from '@/domain/main/application/use-cases/authenticate-org';
import { RegisterPetController } from './controllers/register-pet.controller';
import { RegisterPetUseCase } from '@/domain/main/application/use-cases/register-pet';
import { EditPetController } from './controllers/edit-pet.controller';
import { EditPetUseCase } from '@/domain/main/application/use-cases/edit-pet';
import { DeletePetController } from './controllers/delete-pet.controller';
import { DeletePetUseCase } from '@/domain/main/application/use-cases/delete-pet';
import { GetPetInfoController } from './controllers/get-pet-info.controller';
import { GetPetInfoUseCase } from '@/domain/main/application/use-cases/get-pet-info';
import { FetchPetsByNameController } from './controllers/fetch-pets-by-name.controller';
import { FetchPetsByNameUseCase } from '@/domain/main/application/use-cases/fetch-pets-by-name';
import { FetchPetsByCityController } from './controllers/fetch-pets-by-city.controller';
import { FetchPetsByCityUseCase } from '@/domain/main/application/use-cases/fetch-pets-by-city';
import { FetchPetsByAgeController } from './controllers/fetch-pets-by-age.controller';
import { FetchPetsByAgeUseCase } from '@/domain/main/application/use-cases/fetch-pets-by-age';
import { FetchPetsByWeightController } from './controllers/fetch-pets-by-weight.controller';
import { FetchPetsByWeightUseCase } from './../../domain/main/application/use-cases/fetch-pets-by-weight';
import { FetchPetsByBreedController } from './controllers/fetch-pets-by-breed.controller';
import { FetchPetsByBreedUseCase } from '@/domain/main/application/use-cases/fetch-pets-by-breed';
import { FetchPetsBySizeController } from './controllers/fetch-pets-by-size.controller';
import { FetchPetsBySizeUseCase } from '@/domain/main/application/use-cases/fetch-pets-by-size';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    RegisterPetController,
    EditPetController,
    DeletePetController,
    GetPetInfoController,
    FetchPetsByNameController,
    FetchPetsByCityController,
    FetchPetsByAgeController,
    FetchPetsByWeightController,
    FetchPetsByBreedController,
    FetchPetsBySizeController,
  ],
  providers: [
    RegisterOrgUseCase,
    AuthenticateOrgUseCase,
    RegisterPetUseCase,
    EditPetUseCase,
    DeletePetUseCase,
    GetPetInfoUseCase,
    FetchPetsByNameUseCase,
    FetchPetsByCityUseCase,
    FetchPetsByAgeUseCase,
    FetchPetsByWeightUseCase,
    FetchPetsByBreedUseCase,
    FetchPetsBySizeUseCase,
  ],
})
export class HttpModule {}
