# Installation
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
## Prerequisites
- Node 16.18.0
- MongoDB 5.0.3
- 
As you see we are using yarn so you need to have yarn and install dependencies with yarn. 
```bash
$ yarn install
```
## Environment Variables
This project won't read env from files so you need to set environment before starting
```bash
PORT=3000
HOSTNAME=localhost

MONGO_URI=mongodb://localhost:27017/dexerto

JWT_SECRET=secret123
JWT_EXPIRES_IN=90d
```
## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
## How to contribute
[Contribution guide](./CONTRIBUTING.md)
# Tasks
## Objective:
Your task is to create a scalable and maintainable GraphQL API using Node.js, Apollo, and a NoSQL database. The purpose of this API will be for a gaming review platform where users can review games.
## Requirements:
### Project Setup and Repository:
- [x] Set up a Node.js project using TypeScript.
- [x] Structure the project based on what you believe is the best practice.
- [x] Upload the project to a GitHub repository.
### Data Model:
- [x] Design and implement a data model with at least three related entities: Games, Reviews, and Users.
- [x] Utilise MongoDB, CouchDB, or a similar NoSQL technology for your database.
### GraphQL Implementation:
- [x] Implement the necessary typeDefs and resolvers so that a User can leave a Review for a Game, and list existing reviews with their associated information.
### Error Handling:
- [x] The application should handle potential errors gracefully, returning appropriate status codes and messages.
### Documentation:
- [ ] Provide clear and concise documentation on how to install and run the application locally in the README file of the GitHub repository.
### Bonus Points:
#### Security:
- [x] Implement basic security measures such as rate limiting and input validation.
#### Testing:
- [ ] Write tests for your resolvers using Jest, Cypress, or another testing framework of your choice.
#### Authentication:
- [x] Implement a JWT (JSON Web Token) authentication system for your API.