# Find a Friend, a pet adoption API

API Specifically crafted to connect individuals in search of pets with pet adoption organizations. It provides a platform for organizations to register and validate their identity using JWT. Once authenticated, these organizations can upload information about pets available for adoption, view their own profiles, manage the listed pets, and carry out various account-related tasks. For those seeking a pet, the API offers the ability to search for pets using filters, view results in paginated format, and access detailed information about each pet, including the contact details of the respective organization.

The API follows a Test-Driven Development (TDD) and Domain-Driven Design (DDD) approach. To ensure reliability and accuracy, it is equipped with a comprehensive set of end-to-end and unit tests.

# Technologies

<div style="display: inline_block">
<img align="center" alt="nodejs" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg">
<img align="center" alt="TypeScript" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg">
<img align="center" alt="nestjs" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg">
<img align="center" alt="prisma" height="60" width="80" src="https://vitest.dev/logo.svg">
<img align="center" alt="postgresql" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg">
<img align="center" alt="docker" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg">
<img align="center" alt="prisma" height="60" width="80" src="https://img.icons8.com/?size=256&id=YKKmRFS8Utmm&format=png">
<img align="center" alt="Cloudflare R2" height="80" width="80" src="https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png">
</div>

## Functional Requirements
- [x] It should be able to register a pet, with the following data:
  - name;
  - about;
  - age;
  - weight;
  - breed;
  - size;
  - pictures.
- [x] It should be able to edit a pet, being able to change all the data above;
- [x] It should be able to delete a pet;
- [x] It should be able to list all pets available for adoption by city;
- [x] It should be able to list all pets available for adoption by ORG;
- [x] It should be able to filter pets by their characteristics;
- [x] It should be able to view details of a pet up for adoption;
- [x] It should be able to register as an ORG, with the following data:
  - name of person responsible;
  - email;
  - CEP;
  - address;
  - whatsapp;
  - password.
- [x] It should be able to login as an ORG.


## Business Requirements
- [x] To list the pets, a city or an ORG must be informed;
- [x] An ORG must have an address and a WhatsApp number;
- [x] A pet must be linked to an ORG;
- [x] All filters, excluding city and/or ORG, must be optionals;
- [x] For an ORG to access the application as admin, it must be logged;
- [x] An ORG should not be able to register with a email that already exists;
- [x] An ORG should only edit pets that it created;
- [x] An ORG should only delete pets that it created.


## Non-functional Requirements
- [x] ORG password must be encrypted;
- [x] ORG must be identified by a JWT;
- [x] All data lists must be paginated with 20 items per page.
