import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CursosService } from './../cursos.service';
import { Curso } from './../cursos-lista/curso';

@Injectable({
  providedIn: 'root'
})
/*
  Resolve é usado para executar um código quando a rota é ativada.
  Nesse caso, vamos utilizar para o codigo de alterar,
  ou seja, em vez de ter o codigo no onInit, vamo deixar tudo pronto aqui
  quando a tela for iniciada, todo o codigo ja estará pronto.

  Lembrando de pensar em projetos grandes, ou seja, ganhar tempo nas respostas do servidor.
*/
export class CursoResolverGuard implements Resolve<Curso>  {

  constructor(
    private cursoService: CursosService
  ) { }

  resolve(
    // Uma "Foto" da Rota, para ver quais sao os parametros
    route: ActivatedRouteSnapshot,
    // O estado da rota
    state: RouterStateSnapshot): Curso | Observable<Curso> | Promise<Curso> {

    // Verificando se existe o parametro de rota
    if (route.params && route.params['id']) {
      // Realizando o retorno
      return this.cursoService.loadById(route.params['id']);
    }

    // Se nao tiver valor no parametro, é um curso novo...
    // O of é usado para manter a consistencia, ou seja, garantir que vai retornar um objeto.

    return of({
      id: null,
      nome: null
    });
  }
}

// Nesse caso, o Route.Params nao é um Observable porque é uma Foto da rota.. Portanto é um valor especifico.
