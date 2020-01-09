import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'timeFormat'})
export class TimeFormatPipe implements PipeTransform {
  transform(value, args:string[]) : any {
		let h = Math.trunc(parseInt(value)/60);
		let m = parseInt(value) % 60;
		return `${h}h ${m}min`;
  }
}