import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, User } from '../../models/user.model';
import { AddressService } from '../../services/address.service';
import { UserService } from '../../services/user.service';  // Certifique-se de que o UserService está sendo importado

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Output() userCreated = new EventEmitter<User>();
  public userForm: FormGroup;
  public addressForm: FormGroup;
  public users: User[] = [];  // Armazenando os usuários e seus endereços

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private userService: UserService  // Injeção do serviço de usuário
  ) {}

  public ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s?\d{5}-\d{4}$/)]],
    });

    this.addressForm = this.fb.group({
      zipcode: ['', [Validators.required, Validators.minLength(8)]],
      street: [''],
      district: [''],
      city: [''],
      state: [''],
      complement: ['']
    });

    this.fetchUsers();  // Carregar os usuários ao iniciar o componente
  }

  public submitForm(): void {
    if (this.userForm.valid && this.addressForm.valid) {
      const user: User = {
        ...this.userForm.value,
        addresses: [this.addressForm.value]  // Adiciona o endereço ao usuário
      };

      // Envia a requisição para criar o usuário com o endereço
      this.userService.createUserWithAddress(user).subscribe(
        (response) => {
          console.log('Usuário com endereço criado com sucesso!', response);
          this.users.push(response);  // Adiciona o usuário à lista de usuários
          this.userCreated.emit(response); // Emite o evento com o usuário criado
          this.userForm.reset();
          this.addressForm.reset();
        },
        (error) => {
          console.error('Erro ao criar o usuário:', error);
        }
      );
    }
  }

  public autoFill(): void {
    this.userForm.patchValue({
      name: 'Usuário Teste',
      email: 'teste@example.com',
      cpf: '12345678900',
      phone: '(11) 99999-9999'
    });
  }

  public addAddress(): void {
    if (this.addressForm.valid) {
      this.users[0].addresses.push(this.addressForm.value);  // Agora 'addresses' existe em 'User'
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
