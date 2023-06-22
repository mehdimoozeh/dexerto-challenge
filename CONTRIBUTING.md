## Folders & Files Convention

- All files' names should follow `kebab-case` convention.
- Put all interfaces together into a `interfaces` directory in that context's and then export all of them from `index.ts`.
- Put all DTOs together into `args` and `inptus` directory in that context's directory and then export all of them from `index.ts`.

## pre-commit hooks

After committing your changes, several commands are executed automatically. One of these commands is to make sure your commit messages follow **Conventional Commit** standards.

#### What is a conventional commit?

Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history, which makes it easier to write automated tools on top of it. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The commit contains the following structural elements, to communicate the intent to the consumers of your library:

1. **fix**: a commit of the type “fix” patches a bug in your codebase (this correlates with _PATCH_ in semantic versioning).
2. **feat**: a commit of the type “feat” introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
3. **BREAKING CHANGE**: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be a part of commits of any type.
4. **types other** than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the the Angular convention) recommends build:, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
5. footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.

Additional types are not mandated by the conventional commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE).

A scope may be provided to a commit type to provide additional contextual information and is contained within parenthesis, e.g. `feat(parser): add the ability to parse arrays.`

#### Examples

##### A commit message with description and breaking change footer

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

##### A commit message with ! to draw attention to breaking change

```
refactor!: drop support for Node 6
```

##### Commit message with both ! and BREAKING CHANGE footer

```
refactor!: drop support for Node 6

BREAKING CHANGE: refactor to use JavaScript features not available in Node 6.
```

##### A commit message with no body

```
docs: correct the spelling of CHANGELOG
```

##### A commit message with scope

```
feat(lang): add the Polish language
```

##### A commit message with a multi-paragraph body and multiple footers

```
fix: correct minor typos in code

see the issue for details

on typos fixed.

Reviewed-by: Z
Refs #133
```

## GraphQL
Please read all of [NestJS Graphql documentations'](https://docs.nestjs.com/graphql/quick-start) carefully.

How to use `@ResolveFields()`?  
Imagine a query like below to retrieve a `game`:
```
{
    _id
    title
    reviews {
      comment
    }
    description
  }
}
```  
Steps to achieve:
1. Every class with `@Resolver()` decorator should return a function. *String is not valid*
```typescript
@Resolver(() => Game)
export class GameResolver {}
```
2. Write a `private method` with **exact name of the field** you want to resolve which decorated with `@ResolveField()`
```typescript
@ResolveField()
private reviews()
```  
3. To receive related input you should use `@Parent()` which will be fulfilled the variable with main query data object.
```typescript
@ResolveField()
private reviews(
@Parent() { gameId }: { gameId: Types.ObjectId }
) {}
```  
4. Call the related method from related service and then return the result.
```typescript
return this.reviewService.find({gameId}).limit(10);
```  
Full example:
```typescript
@Resolver(() => Game)
export class GameResolver {
  constructor(
    private readonly gameService: GameService,
    private readonly reviewService: ReviewService,
  ) {
  }

  @ResolveField(() => [Review])
  private async reviews(@Parent() game: Game): Promise<Review[]> {
    const result = await this.reviewService.getReviewsByGameId(
      game._id.toString(),
      10,
      1,
    );
    return result.reviews;
  }

  @Query(() => Game)
  async gameById(@Args() gameByIdArgs: GameByIdArgs): Promise<Game> {
    const result = await this.gameService.getGameById(gameByIdArgs.gameId);
    return result;
  }
}
```  
`gameById` will resolve `reviews` automatically.
## DTO

_A DTO is an object that defines how the data will be transferred over the network._
https://martinfowler.com/eaaCatalog/dataTransferObject.html  
In this project, there will be 2 types of DTOs: Request (args, inputs), and Response DTO.

### Request and Response DTOs

There are two directories alongside each `entity`: `args` and `inputs` which holds DTOs for incoming requests, and outgoing responses.

_naming convention_: Name of DTO file should be prefixed with the name of its handler function converted from camelCase to kebab-case. For example if we had a resolver named `game.resolver.ts` like this:

```

class Game {

  @Query(() => [Game])
  public allGames() {
    ...
  }
}
```

Request DTO should be inside `args` directory alongside `game.resolver.ts` and be named `game-by-id.args.ts` and the name of DTO class inside this file should be `GetAllGamesArgs` (you **must** replace `args` or `inputs` with `Response` so it turns to `GetAllGamesResponse`).

**Note (1):** Each DTO should be used only by **ONE** handler function. Using one DTO inside 2 or more handler functions is not a valid pattern.

## Error Handling
Exceptions could be raised in three different layers: Resolver, Service and Model (Database transactions). Possible errors at first should be thrown in services specifically for each case, these cases include model related errors (e.g. model not found) or an error concerning the business logic.    
Here most common error types which you can import from `apollo-server-express`  
[Other Error types](https://www.apollographql.com/docs/apollo-server/data/errors/#error-codes)
```typescript
import {
  UserInputError,
  ValidationError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-express';
```
An example of error handling in services is provided below:
```
export class GameService {
	...
	const game = await this.gameModel.findOne(...)
	if (!game) {
    	throw new ForbiddenError('Game not found')
    }

```

## Project Structure
### `src` directory

`src` directory contains all of `entities'` for this project.
Each `resolver`s. `service`s should be placed alongside with them in the same directory.

**Note (1):** `resolver`s should only use `DTO`s that are in the same directory.

#### Contribution Guide

1. Code logic should be in the `*.service.ts`.
2. Database Queries should be in the models.
3. Resolvers use their own services.
4. Do not use a module's model in another module.
5. `Args` and `Inputs` and `Response` should be complete.
6. To achieve the project uniformity, merge requests should cover all project style guide standards.
7. Branch names should include `fix`, `feat` or `feature` prefix and explain branch task.

### Unit test

[Joi expect documentation](https://jestjs.io/docs/en/expect)  
[More about concept](https://martinfowler.com/bliki/UnitTest.html)

#### What should we do

1. Check parameters of the function expect object as an argument.
2. Mock dependencies for just the first layer (do not mock dependencies of the first layer dependencies).
3. Expect return value.
4. Expect errors.

[How deep are your unit test? answered by Kent Beck!](https://stackoverflow.com/questions/153234/how-deep-are-your-unit-tests)
### End-to-End test

We use the official Nest end to end test which means we use Supertest and Jest.
Every test file name must be in ".test-e2e.ts" pattern and you have to put the test file just near the controller.

##### Structure in end-to-end test files
coming soon :D