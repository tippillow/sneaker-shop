import { Pipe, PipeTransform } from '@angular/core';

const maxStringLegth = 25;

@Pipe({
    name: 'cut'
})
export class CutPipe implements PipeTransform {

    transform(value: string): string {
        if (value.length > maxStringLegth) {
            const newString = value.slice(0, maxStringLegth) + '...';

            return newString;
        }

        return value;
    }

}
