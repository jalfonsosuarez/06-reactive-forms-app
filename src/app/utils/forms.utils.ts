import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormsUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  //? Al menos una minúscula, una mayúscula, un número, un símbolo, entre 8 y 12 caracteres
  static passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);
  }

  static isFieldOneIsEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { fieldsNotEqual: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    return formValue === 'hola@mundo.com' ? { emailTaken: true } : null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const formValue: string = control.value;
    return formValue.toLowerCase() === 'strider' ? { notStrider: true } : null;
  }

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `Valor mínimo de ${errors['min'].min}.`;
        case 'email':
          return `Valor introducido no es un email válido.`;
        case 'emailTaken':
          return `El correo electrónico ya está en uso.`;
        case 'notStrider':
          return `No se permite el nombre de usuario Strider.`;
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return `Valor introducido no es un email válido.`;
          }
          return `Error de validación del pattern.`;
        default:
          return `Se ha producido un error en la validación del ${key}.`;
      }
    }
    return null;
  }
}
