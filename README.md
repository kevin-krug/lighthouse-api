## Description

A [Nest](https://github.com/nestjs/nest) App to analyse a websites performance returning key metrics (FCP, LCP, CLS, TTI, TBT). 

## API Usage

http://localhost:3000/metrics?url={pageToAnalyse} - returns the performance metrics as json (based on lighthouse).

### Query Params

- `url`: **required**. the url of the page to analyse `{pageToAnalyse}`. the url validity and reachability will be checked. 


## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

