import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  fromTimestamp(timestamp: number): DateTime {
    return DateTime.fromMillis(timestamp);
  }
}
