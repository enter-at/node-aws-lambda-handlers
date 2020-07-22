import { Format } from "../../format/Format";

class FormatDecorator<T> implements Format {
    constructor(readonly contentType: string, private formatter: (content: unknown) => unknown) {}

    public apply<T>(content: unknown): T {
        return this.formatter(content) as T;
    }
}

export function format(
    contentType: string
): (_target: unknown, _propertyName: string, propertyDescriptor: PropertyDescriptor) => PropertyDescriptor {
    function wrapper(
        _target: unknown,
        _propertyName: string,
        propertyDescriptor: PropertyDescriptor
    ): PropertyDescriptor {
        propertyDescriptor.value = new FormatDecorator(contentType, propertyDescriptor.value);
        return propertyDescriptor;
    }

    return wrapper;
}
