import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})

export class NewLinePipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if (value) {
      return value
        .split('%new-line')
        .map(str => str.trim())
        .join('<br>');
    }
    return '<br>';
  }
}
