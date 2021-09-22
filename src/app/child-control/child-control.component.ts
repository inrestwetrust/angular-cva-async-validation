import { Component, OnInit } from '@angular/core';
import { AppValidator } from '../app.validator';
import {
  FormGroup,
  AsyncValidator,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
  ControlValueAccessor,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, first, filter } from 'rxjs/operators';

@Component({
  templateUrl: './child-control.component.html',
  selector: 'child-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChildControlComponent,
      multi: true,
    },
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ChildControlComponent,
      multi: true,
    },
  ],
})
export class ChildControlComponent
  implements ControlValueAccessor, AsyncValidator, OnInit
{
  childForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appValidator: AppValidator
  ) {}

  ngOnInit() {
    this.childForm = this.formBuilder.group({
      childControl: this.formBuilder.control(
        '',
        [],
        [this.appValidator.asyncValidation()]
      ),
    });
    this.childForm.statusChanges.subscribe((status) => {
      console.log('subscribe', status);
    });
  }

  // region CVA
  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (!val) {
      return;
    }
    this.childForm.patchValue(val);
  }

  registerOnChange(fn: () => void): void {
    this.childForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.childForm.disable() : this.childForm.enable();
  }

  validate(): Observable<ValidationErrors | null> {
    console.log('validate');
    // return this.taxCountriesForm.valid ? null : { invalid: true };
    return this.childForm.statusChanges.pipe(
      filter((status) => status !== 'PENDING'),
      map((status) => {
        console.log('pipe', status);
        return status == 'VALID' ? null : { invalid: true };
      }),
      first()
    );
  }
  // endregion
}
