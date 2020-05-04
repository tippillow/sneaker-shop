import { TestBed, async } from '@angular/core/testing';
import { ReplaceEndPipe } from './replace-end.pipe';

describe('Pipe: ReplaceEnde', () => {
    const replaceEnd = new ReplaceEndPipe();

    it(`must replace 1 to "1 товар"`, () => {
        expect(replaceEnd.transform(1)).toBeTruthy('1 товар');
    });

    it(`must replace 2 to "2 товара"`, () => {
        expect(replaceEnd.transform(2)).toBeTruthy('2 товара');
    });

    it(`must replace 5 to "5 товаров"`, () => {
        expect(replaceEnd.transform(2)).toBeTruthy('5 товаров');
    });

    it(`must replace 21 to "21 товар"`, () => {
        expect(replaceEnd.transform(2)).toBeTruthy('21 товар');
    });
});
