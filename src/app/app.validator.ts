import { Injectable } from "@angular/core";
import {
  AbstractControl,
  ValidationErrors,
  FormControl,
  AsyncValidatorFn
} from "@angular/forms";
import { Observable } from "rxjs";
import { AppService } from "./app.service";
import { map } from "rxjs/operators";

@Injectable()
export class AppValidator {
  constructor(private appService: AppService) {}

  asyncValidation(): AsyncValidatorFn {
    const self = this;
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return self.appService.getData().pipe(
        map(() => {
          return null;
        })
      );
    };
  }
}
