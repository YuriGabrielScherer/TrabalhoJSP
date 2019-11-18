import { AlunoListaComponent } from './aluno-lista/aluno-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';


@NgModule({
  declarations: [AlunoListaComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule
  ]
})
export class AlunoModule { }
