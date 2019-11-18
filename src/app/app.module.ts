import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Modal do Bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AlunoModule } from './aluno/aluno.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SharedModule,
    LoginModule,
    AlunoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
