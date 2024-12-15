import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'usdTransform',
})
export class UsdTransformPipe implements PipeTransform {
  public transform(value: string): string {
    const number: string = Number(value).toFixed(6);
    return `${number} $`;
  }
}
