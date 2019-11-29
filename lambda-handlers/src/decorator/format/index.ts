import {IFormat} from '../../format/IFormat';

class Format implements IFormat {
    constructor(readonly contentType: string, private formatter: any) {
    }

    public apply(content: any): any {
        return this.formatter(content);
    }

}

export function format(contentType: string) {
    function wrapper(target: object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
        propertyDescriptor.value = new Format(contentType, propertyDescriptor.value);
        return propertyDescriptor;
    }

    return wrapper;
}
