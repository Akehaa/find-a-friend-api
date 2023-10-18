<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# App

pet adoption app

## Functional Requirements
- [] It should be able to register a pet, with the following characteristics:
  - name;
  - about;
  - age;
  - weight;
  - breed;
  - size;
- [] It should be able to list all pets available for adoption in a city;
- [] It should be able to filter pets by their characteristics;
- [] It should be able to view details of a pet up for adoption;
- [] It should be able to register as an ORG;
- [] It should be able to login as an ORG;
- [] It should be able to authenticate as an ORG.


## Business Requirements
- [] To list the pets, a city must be informed;
- [] An ORG must have an address and a WhatsApp number;
- [] A pet must be linked to an ORG;
- [] All filters, excluding city, must be optionals;
- [] For an ORG to access the application as admin, it must be logged.


## Non-functional Requirements
- [] ORG password must be encrypted;
- [] ORG must be identified by a JWT;
