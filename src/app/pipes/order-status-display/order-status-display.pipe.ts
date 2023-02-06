import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatusDisplay',
})
export class OrderStatusDisplayPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'FOR_PREPARATION') return 'For prep';
    if (value === 'IN_PROGRESS') return 'In progress';
    if (value === 'READY') return 'Ready';
    if (value === 'DELIVERED') return 'Delivered';
    if (value === 'FINISHED') return 'Finished';
    return value;
  }
}
