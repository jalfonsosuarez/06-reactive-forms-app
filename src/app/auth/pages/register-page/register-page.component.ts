import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsUtils } from '../../../utils/forms.utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormsUtils;

  myForm: FormGroup = this.fb.group(
    {
      fullName: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
        [FormsUtils.checkingServerResponse],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          FormsUtils.notStrider,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.formUtils.passwordPattern),
        ],
      ],
      password2: [
        '',
        [
          Validators.required,
          Validators.pattern(this.formUtils.passwordPattern),
        ],
      ],
    },
    {
      validators: [
        this.formUtils.isFieldOneIsEqualFieldTwo('password', 'password2'),
      ],
    }
  );

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }
}
