import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoListaComponent } from './aluno-lista/aluno-lista.component';

const routes: Routes = [
  { path: '', component: AlunoListaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
