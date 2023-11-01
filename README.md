<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# App

pet adoption app

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
- [x] It should be able to login as an ORG;


## Business Requirements
- [x] To list the pets, a city or an ORG must be informed;
- [x] An ORG must have an address and a WhatsApp number;
- [x] A pet must be linked to an ORG;
- [x] All filters, excluding city and/or ORG, must be optionals;
- [] For an ORG to access the application as admin, it must be logged;
- [x] An ORG should not be able to register with a email that already exists.
- [x] An ORG should only edit pets that it created;
- [x] An ORG should only delete pets that it created;


## Non-functional Requirements
- [x] ORG password must be encrypted;
- [] ORG must be identified by a JWT;
- [x] All data lists must be paginated with 20 items per page.
