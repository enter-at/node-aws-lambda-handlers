### Headers

#### Cors

```typescript
import {APIGatewayProxyHandler, cors} from '@enter-at/lambda-handlers';

@APIGatewayProxyHandler({
    cors: cors('example.com', false)
})
export function handler(event, context) {
    return {
        message: 'Hello World!'
    };
}
```

```bash
aws lambda invoke --function-name cors /tmp/response.json
```

Responds with:

```json
{
    "headers":{
        "Access-Control-Allow-Origin": "example.com",
        "Content-Type": "application/json"
    },
    "statusCode": 201,
    "body": "\"Hello World!\""
}
```