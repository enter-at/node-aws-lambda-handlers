## [3.0.1](https://github.com/enter-at/node-aws-lambda-handlers/compare/v3.0.0...v3.0.1) (2020-11-24)


### Bug Fixes

* **build:** update release workflow ([0c6e1d2](https://github.com/enter-at/node-aws-lambda-handlers/commit/0c6e1d2ac53800391af278839db8241e13c33f83))

# [3.0.0](https://github.com/enter-at/node-aws-lambda-handlers/compare/v2.1.0...v3.0.0) (2020-11-24)


### Bug Fixes

* **build:** do not copy npmrc files ([40d5668](https://github.com/enter-at/node-aws-lambda-handlers/commit/40d566818104060d13cf029044b6294c4d34bd80))
* **build:** ensure slim package structure ([be8998b](https://github.com/enter-at/node-aws-lambda-handlers/commit/be8998b160433c52dfa7d877cba60e2f1ed6e698))
* **build:** remove version* scripts ([544b384](https://github.com/enter-at/node-aws-lambda-handlers/commit/544b384b899a30c6650091bd31c3f49909fa1afd))


### BREAKING CHANGES

* **build:** "dist" directory has been removed from the build artifact

# [2.1.0](https://github.com/enter-at/node-aws-lambda-handlers/compare/v2.0.2...v2.1.0) (2020-11-12)


### Bug Fixes

* **ci:** update release token ([3c27ec0](https://github.com/enter-at/node-aws-lambda-handlers/commit/3c27ec0e45ac84ffca9ce93264b373577c10a54c))


### Features

* **errors:** add unprocessable entity error handling ([2b97792](https://github.com/enter-at/node-aws-lambda-handlers/commit/2b97792ba18667214d910452c513472eb91681ed))

## [2.0.2](https://github.com/enter-at/node-aws-lambda-handlers/compare/v2.0.1...v2.0.2) (2020-07-24)


### Bug Fixes

* **BaseHandler:** ensure function scope ([34b2dac](https://github.com/enter-at/node-aws-lambda-handlers/commit/34b2dacac1961cdaa56c3db2c027883cf49d8474))

## [2.0.1](https://github.com/enter-at/node-aws-lambda-handlers/compare/v2.0.0...v2.0.1) (2020-07-24)


### Bug Fixes

* **ApiGatewayProxyHandler:** use implicit type for decorator ([9ada1b1](https://github.com/enter-at/node-aws-lambda-handlers/commit/9ada1b1c1e07b0dc9e8359d3486289f0af96e6c0))

# [2.0.0](https://github.com/enter-at/node-aws-lambda-handlers/compare/v1.2.0...v2.0.0) (2020-07-23)


### Features

* **errors:** expose UnauthorizedError ([51fc5cc](https://github.com/enter-at/node-aws-lambda-handlers/commit/51fc5cc2b68ee3831b0b8d1a0310521e46283ac5))


### BREAKING CHANGES

* **errors:** rename of all interfaces remove leading "I"

# [1.2.0](https://github.com/enter-at/node-aws-lambda-handlers/compare/v1.1.1...v1.2.0) (2020-07-14)


### Bug Fixes

* **APIGatewayProxyHandler:** fix linter issues ([e581bdb](https://github.com/enter-at/node-aws-lambda-handlers/commit/e581bdbec70d4d48e5c67b6240d79d2017192fb9))


### Features

* **tests:** add tests for error responses ([e506a2f](https://github.com/enter-at/node-aws-lambda-handlers/commit/e506a2ffd712cacb2e3c6c2cd8674a7815909702))

## [1.1.1](https://github.com/enter-at/aws-node/compare/v1.1.0...v1.1.1) (2020-05-25)


### Bug Fixes

* define compile target version ([fe82cc5](https://github.com/enter-at/aws-node/commit/fe82cc52cb72744b4fc815e4a3b6163a7880b421))

# [1.1.0](https://github.com/enter-at/aws-node/compare/v1.0.0...v1.1.0) (2020-05-25)


### Features

* **response:** add unauthorized ([7cb9171](https://github.com/enter-at/aws-node/commit/7cb91716dbb514142b407d999141695a61b9ceae))

# 1.0.0 (2019-12-18)


### Bug Fixes

* **APIGatewayProxyHandler:** remove redundant json parse ([3b38990](https://github.com/enter-at/aws-node/commit/3b38990a95108dd6b09c0f8dfb80580a1b7e7d7e))
* **LambdaHandler:** change wrapped method scope and args ([0daff4f](https://github.com/enter-at/aws-node/commit/0daff4f27ba9c061539803b06cacb0a3013c1258))
* **package:** remove unused dependencies ([a898371](https://github.com/enter-at/aws-node/commit/a8983714d7e50eb53956afb97332c8f59419eee8))
* **release:** configure workflow ([c1f5ece](https://github.com/enter-at/aws-node/commit/c1f5eceb932947a31e7b239154f60b2929589b6c))
