import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroUserComponent } from './components/cadastro-user/cadastro-user.component';
const routes: Routes = [
  { path: '', component: CadastroUserComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
