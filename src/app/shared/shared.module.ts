import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ReactiveSearchComponent } from './reactive-search/reactive-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent, ReactiveSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AlertModalComponent, ReactiveSearchComponent],
  // Componentes que são chamados em tempo de execução devem ser declarados aqui
  entryComponents: [AlertModalComponent, ConfirmModalComponent, ReactiveSearchComponent]
})
export class SharedModule { }
