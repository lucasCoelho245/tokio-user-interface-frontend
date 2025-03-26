import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserFormComponent } from './components/form/user-form.component';
import { CadastroUserComponent } from './components/cadastro-user/cadastro-user.component';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    CadastroUserComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
