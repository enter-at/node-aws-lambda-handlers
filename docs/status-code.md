### Status code

```typescript
import {APIGatewayProxyHandler} from '@enter-at/lambda-handlers';

@APIGatewayProxyHandler()
export function handler(event, context) {
    return {
        message: `Hello ${event.queryStringParameters.name}!`
    };
}
```

Let's invoke the function:

```bash
payload='{"queryStringParameters": {"name": "Peter"}}'
aws lambda invoke --function-name hello-world --payload $payload /tmp/response.json
```

Responds with:

```json
{
    "headers":{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    "statusCode": 200,
    "body": "\"Hello Peter!\""
}
```

Default headers and status code have been added.

#### Respond with a specific status code

```typescript
import {APIGatewayProxyHandler, created} from '@enter-at/lambda-handlers';

@APIGatewayProxyHandler()
export function handler(event, context) {
    const resource = {id: 1, name: event.body.name};
    return created(resource);
}
```

```bash
payload='{"body": "{\"name\": \"Peter\"}"}'
aws lambda invoke --function-name create-resource --payload $payload /tmp/response.json
```

Responds with:

```json
{
    "headers":{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    "statusCode": 201,
    "body": "{\"id\":1,\"name\":\"Peter\"}"
}
```

#### Error handling

```typescript
import {APIGatewayProxyHandler, BadRequestError} from '@enter-at/lambda-handlers';

@APIGatewayProxyHandler()
export function handler(event, context) {
    throw new BadRequestError('missing email');
}
```

```bash
aws lambda invoke --function-name create-resource $payload /tmp/response.json
```

Responds with:

```json
{
    "headers":{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    "statusCode": 400,
    "body": "{\"errors\":[{\"name\": \"BadRequestError\", \"details\": [\"missing email\"]}]}"
}
```
