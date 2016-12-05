import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})

export class NewLinePipe implements PipeTransform {
  transform(input: any): string {
    if (input) {
      return '' + input
        .split('%new-line')
        .map(str => str.trim())
        .join('<br>');
    }
    return '<br>';
  }
}
