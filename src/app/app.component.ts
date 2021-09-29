import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  mainForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.mainForm = this.formBuilder.group({
      mainControl: this.formBuilder.control(''),
    });

    // require to set value after view ready
    // otherwise initial state of form will freeze on PENDING
    this.changeDetector.detectChanges();
    this.mainForm.setValue({
      mainControl: {
        childControl: 'test',
      },
    });
  }
}
