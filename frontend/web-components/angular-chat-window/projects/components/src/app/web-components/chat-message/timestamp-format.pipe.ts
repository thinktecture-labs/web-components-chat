import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeService } from '../services/date-time.service';

@Pipe({
  name: 'timestampFormat',
})
export class TimestampFormatPipe implements PipeTransform {
  constructor(private readonly dateTimeService: DateTimeService) {
  }

  transform(value: number): string {
    return this.dateTimeService.fromTimestamp(value).toFormat('hh:mm');
  }

}
