# Nodejs Backend Starter

[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=jeiman_nodejs-backend-starter&metric=alert_status)](https://sonarcloud.io/dashboard?id=jeiman_nodejs-backend-starter)

 [![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=jeiman_nodejs-backend-starter&metric=alert_status)](https://sonarcloud.io/dashboard?id=jeiman_nodejs-backend-starter) 
 [![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=jeiman_nodejs-backend-starter&metric=coverage)](https://sonarcloud.io/component_measures/metric/coverage/list?id=jeiman_nodejs-backend-starter)
 [![SonarCloud Bugs](https://sonarcloud.io/api/project_badges/measure?project=jeiman_nodejs-backend-starter&metric=bugs)](https://sonarcloud.io/component_measures/metric/reliability_rating/list?id=jeiman_nodejs-backend-starter)
 [![SonarCloud Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jeiman_nodejs-backend-starter&metric=vulnerabilities)](https://sonarcloud.io/component_measures/metric/security_rating/list?id=jeiman_nodejs-backend-starter)



## How to run

1. Fork this repository
2. Ensure `node (>8.6)` and `npm` are installed
3. Run `npm install`
4. Run `npm test`
5. Run `npm start`
6. Hit the server to test health `curl localhost:8010/health` and expect a `200` response

## Consists of following components

1. [Documentation](#documentation)
2. [Tooling](#tooling)
3. [Pagination](#implement-pagination)
4. [Security](#security)
5. [Load Testing](#load-testing)

### Documentation

Setup JSDoc to generate API documentation for the project.

Install JSDoc globally inorder to generate the documentation
`npm install -g jsdoc`


### Tooling

Consists of following

1. `eslint` - for linting
2. `nyc` - for code coverage
3. `pre-push` - for git pre push hook running tests
4. `winston` - for logging

#### Criteria

1. `eslint` should have an opinionated format
2. `nyc` should aim for test coverage of `80%` across lines, statements, and branches
3. `pre-push` should run the tests before allowing pushing using `git`
4. `winston` should be used to replace console logs and all errors should be logged as well. Logs should go to disk.
5. integration to CI such as Travis or Circle - NOT DONE
6. Add Typescript support - NOT DONE

### Pagination

Implement Pagination

### Security

Please implement the following security controls for your system:

1. Ensure the system is not vulnerable to [SQL injection](https://www.owasp.org/index.php/SQL_Injection)

### Load Testing

Please implement load testing to ensure your service can handle a high amount of traffic

1. Implement load testing using `artillery`
    1. Ensure that load testing is able to be run using `npm test:load`. You can consider using a tool like `forever` to spin up a daemon and kill it after the load test has completed.
    2. Test all endpoints under at least `100 rps` for `30s` and ensure that `p99` is under `50ms`
