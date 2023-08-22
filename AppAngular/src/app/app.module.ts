import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Para usar comando no HTML, como if, for, while,...
import {HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Para usar formulário
import  {ModalModule} from 'ngx-bootstrap/modal'; // Para exibir modal 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasService } from './pessoas.service';
import { PessoasComponent } from 'components/pessoas/pessoas.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),// Registrar para aplicação inteira
  ],
  providers: [HttpClientModule, PessoasService], // Registrar para fazer a injeção de dependencia
  bootstrap: [AppComponent]
})
export class AppModule { }
