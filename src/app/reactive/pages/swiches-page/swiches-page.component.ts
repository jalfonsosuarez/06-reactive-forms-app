import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsUtils } from '../../../utils/forms.utils';

@Component({
  selector: 'app-swiches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './swiches-page.component.html',
})
export class SwichesPageComponent {
  private fb = inject(FormBuilder);
  formsUtils = FormsUtils;

  myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true],
    termsAndConditions: [false, [Validators.requiredTrue]],
  });

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }
}
