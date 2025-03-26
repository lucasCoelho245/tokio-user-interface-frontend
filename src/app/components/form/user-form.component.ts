import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, User } from '../../models/user.model';
import { AddressService } from '../../services/address.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Output() userCreated = new EventEmitter<User>();
  public userForm: FormGroup;
  public addressForm: FormGroup;
  public users: User[] = [];

  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public phoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private userService: UserService
  ) {}

  public ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],  // Alterado para permitir qualquer valor não vazio
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s?\d{5}-\d{4}$/)]],
    });

    this.addressForm = this.fb.group({
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],  // Permitindo o hífen opcional
      street: [''],
      district: [''],
      city: [''],
      state: [''],
      complement: ['']
    });
    this.fetchUsers();
  }

  public submitForm(): void {
    this.markFormGroupTouched(this.userForm);
    this.markFormGroupTouched(this.addressForm);

    // Remover espaços extras no nome antes de validar
    const trimmedName = this.userForm.controls['name'].value.trim();
    this.userForm.controls['name'].setValue(trimmedName);

    if (this.userForm.valid && this.addressForm.valid) {
      const user: User = {
        ...this.userForm.value,
        addresses: [this.addressForm.value]
      };

      this.userService.createUserWithAddress(user).subscribe(
        (response) => {
          console.log('Usuário com endereço criado com sucesso!', response);
          this.users.push(response);
          this.userCreated.emit(response);
          this.userForm.reset();
          this.addressForm.reset();
        },
        (error) => {
          console.error('Erro ao criar o usuário:', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  public autoFill(): void {
    this.userForm.patchValue({
      name: 'Usuário Teste',
      email: 'teste@example.com',
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999'
    });
  }

  public addAddress(): void {
    if (this.addressForm.valid) {
      this.users[0].addresses.push(this.addressForm.value);
      this.addressForm.reset();
    }
  }

  public fetchAddress(): void {
    const cep = this.addressForm.get('zipcode').value;
    if (!cep || cep.length < 8) { return; }

    this.addressService.getAddressByCep(cep).subscribe({
      next: (data: Address) => {
        this.addressForm.patchValue({
          street: data.street,
          district: data.district,
          city: data.city,
          state: data.state
        });
      },
      error: () => {
        alert('CEP não encontrado.');
      }
    });
  }

  public fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }
}
