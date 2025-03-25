import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoDataService {
  static validarTransferencia(valor: number, descricao: string): string | null {
    if (valor <= 0) { return 'O valor da transferência deve ser maior que zero.'; }
    if (!descricao.trim()) { return 'A descrição não pode ser vazia.'; }
    return null;
  }
}
