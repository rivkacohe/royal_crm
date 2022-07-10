import { Pipe, PipeTransform } from '@angular/core';
import { number } from 'joi';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {

    const number = value.split('-');

    return  `(${number[0]} ${number[1]})`;
  }

}
