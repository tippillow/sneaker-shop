import { Pipe, PipeTransform } from '@angular/core';

const FORMS = [' товар', ' товара', ' товаров'];

@Pipe({
  name: 'replaceEnd'
})
export class ReplaceEndPipe implements PipeTransform {

  transform(value: number): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return value + FORMS[(value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5]];
  }

}
