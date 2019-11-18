import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Curso } from './cursos-lista/curso';
import { environment } from './../../environments/environment';
import { delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`; /* Isso faz uma concatenacao entre as variaveis */

  constructor(
    // Usado para fazer contato com o servidor - Usando JSON
    private http: HttpClient,
  ) { }

  // Metodo Listar
  list() {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(2000)
      );
  }

  loadById(id) {
    // Fazendo a concatenacao com o API e o ID, indo apenas uma vez fazer a requisicao
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  private update(curso) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  // Aqui verifica se é alteracao ou inserçao
  save(curso) {
    if (curso.id) {
    // Se houver ID -> Update
      return this.update(curso);
    }
    // Se não, insert
    return this.create(curso)
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
