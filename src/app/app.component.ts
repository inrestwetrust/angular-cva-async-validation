import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  mainForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.mainForm = this.formBuilder.group({
      mainControl: this.formBuilder.control(''),
    });

    setTimeout(()=>{this.mainForm.setValue({
      mainControl: {
        childControl: 'test',
      },
    })}, 0);
  }
}
