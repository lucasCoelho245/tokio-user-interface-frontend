import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Output() userCreated = new EventEmitter<User>();
  public userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  public submitForm(): void {
    if (this.userForm.valid) {
      this.userCreated.emit(this.userForm.value);
      this.userForm.reset();
    }
  }

  public autoFill(): void {
    this.userForm.patchValue({
      name: 'Usuário Teste',
      email: 'teste@example.com',
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999'
    });
  }
}
