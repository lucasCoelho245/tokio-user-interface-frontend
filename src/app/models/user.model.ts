export interface User {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  addresses: Address[];
}
export interface Address {
  street: string;
  district: string;
  city: string;
  state: string;
  zipcode: string;
}
