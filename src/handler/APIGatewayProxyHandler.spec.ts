import { APIGatewayProxyHandler } from "./APIGatewayProxyHandler";
import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult, Context } from "aws-lambda";
import {
    RequestTimeoutError,
    InternalServerError,
    NotFoundError,
    ValidationError,
    FormatError,
    ForbiddenError,
    BadRequestError,
} from "../error";
import { ok, created, noContent } from '../response'
import * as ContextFactory from "../../test/fixtures/ContextFactory";
import * as APIGatewayProxyEventFactory from "../../test/fixtures/APIGatewayProxyEventFactory";

describe(APIGatewayProxyHandler.name, () => {
    let handler: APIGatewayProxyHandler;
    let context: Context;
    let event: APIGatewayProxyEvent;

    beforeEach(() => {
        handler = new APIGatewayProxyHandler();
        context = ContextFactory.factory();
        event = APIGatewayProxyEventFactory.factory();
    });

    it("handles HTTP 200 response correctly", async () => {
        const fn = handler.wrapper(() => {
            return ok({ result: "HTTP 200" })
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });

    it("handles HTTP 201 response correctly", async () => {
        const fn = handler.wrapper(() => {
            return created({ result: "HTTP 201" })
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });

    it("handles HTTP 204 response correctly", async () => {
        const fn = handler.wrapper(() => {
            return noContent()
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });

    it("handles BadRequestError response correctly", async () => {
        const fn = handler.wrapper(() => {
            throw new BadRequestError("BadRequestError message");
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });

    it("handles ForbiddenError response correctly", async () => {
        const fn = handler.wrapper(() => {
            throw new ForbiddenError("ForbiddenError message");
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });

    it("handles FormatError response correctly", async () => {
        const fn = handler.wrapper(() => {
            throw new FormatError("FormatError message");
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });

    it("handles InternalServerError response correctly", async () => {
        const fn = handler.wrapper(() => {
            throw new InternalServerError("InternalServerError message");
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });

    it("handles NotFoundError response correctly", async () => {
        const fn = handler.wrapper(() => {
            throw new NotFoundError("NotFoundError message");
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });

    it("handles RequestTimeoutError response correctly", async () => {
        const fn = handler.wrapper(() => {
            throw new RequestTimeoutError("RequestTimeoutError message");
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });

    it("handles ValidationError response correctly", async () => {
        const fn = handler.wrapper(() => {
            throw new ValidationError("ValidationError message");
        }) as Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

        const result = await fn(event, context, () => {});
        expect(result).toMatchSnapshot();
    });
});
