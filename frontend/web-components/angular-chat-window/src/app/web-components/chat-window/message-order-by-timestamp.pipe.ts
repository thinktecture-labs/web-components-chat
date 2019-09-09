import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models/message';

@Pipe({
  name: 'messageOrderByTimestamp',
})
export class MessageOrderByTimestampPipe implements PipeTransform {
  transform(value: Message[]): Message[] {
    value = [...value];
    return value.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return 1;
      }

      if (a.timestamp > b.timestamp) {
        return -1;
      }

      return 0;
    });
  }

}
