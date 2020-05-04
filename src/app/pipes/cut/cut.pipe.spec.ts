import { TestBed, async } from '@angular/core/testing';
import { CutPipe } from './cut.pipe';

describe('Pipe: Cute', () => {
    const cut = new CutPipe();

    it(`doesn't cut "Hello, World!"`, () => {
        expect(cut.transform('Hello, World!')).toBe('Hello, World!');
    });

    it(`must cut "Testing pipe and must cut this string and add ..."`, () => {
        expect(cut.transform('Testing pipe and must cut this string and add ...')).toBe('Testing pipe and must cut...');
    });
});
