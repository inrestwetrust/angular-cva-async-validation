import { Injectable } from "@angular/core";
import { interval, Observable, of } from "rxjs";
import { mergeMap, skipWhile, take, tap, map } from "rxjs/operators";

@Injectable()
export class AppService {
  constructor() {}

  getData(): Observable<any> {
    return interval(1000).pipe(
      mergeMap(() => {
        return of({ answer: true });
      }),
      skipWhile(result => !result.answer),
      take(1),
      tap(result => {
        return result;
      })
    );
  }
}
