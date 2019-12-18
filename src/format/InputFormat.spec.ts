import {FormatError} from '../error';
import * as format from './InputFormat';

describe('InputFormat', () => {
    describe('json', () => {
        it('should format to dictionary', () => {
            const actual = format.json.apply('{"name": "Peter"}');
            expect(actual).toEqual({name: 'Peter'});
        });
        it('should format to dictionary and preserve integer values', () => {
            const actual = format.json.apply('{"score": 100}');
            expect(actual).toEqual({score: 100});
        });
        it('should format to dictionary and preserve boolean values', () => {
            const actual = format.json.apply('{"is_valid": true}');
            expect(actual).toEqual({is_valid: true});
        });
        it('should format to nested dictionary', () => {
            const actual = format.json.apply('{"person": {"name": "Peter"}}');
            expect(actual).toEqual({person: {name: 'Peter'}});
        });
        it('should format to empty dictionary', () => {
            const actual = format.json.apply('{}');
            expect(actual).toEqual({});
        });
        it('should not format bare string', () => {
            const fn = () => format.json.apply('xyz');
            expect(fn).toThrow(new FormatError('Invalid JSON input.'));
        });
        it('should format empty string', () => {
            const fn = () => format.json.apply('');
            expect(fn).toThrow(new FormatError('Invalid JSON input.'));
        });
    });
});
