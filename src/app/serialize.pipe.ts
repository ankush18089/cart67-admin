import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serialize'
})
export class SerializePipe implements PipeTransform {
  transform(obj: any): string {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }
}
