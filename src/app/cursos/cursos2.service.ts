import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { CrudService } from './../shared/crud-service';
import { Curso } from './cursos-lista/curso';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected http: HttpClient) {
    // Passando os parametros do Construtor do CrudService
    // Nesse caso, HTTP e API de Cursos
    super(http, `${environment.API}cursos`);
  }

  // Aqui eu poderia colocar uma logica de conexao exclusiva do Cursos,
  // Nao sendo parte do Crud que já esta declarado no Crud Service
}
