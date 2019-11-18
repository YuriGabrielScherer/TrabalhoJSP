import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';

import { Curso } from './curso';
import { Cursos2Service } from './../cursos2.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // Variavel para receber os cursos
  private cursos: Curso[];

  // Observables
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  // Variavel para o Modal
  // bsModalRef: BsModalRef;

  // Ref Modal de Exclusao
  deleteModalRef: BsModalRef;

  // Pegando a variavel do Template para ser usada aqui
  @ViewChild('deleteModal', { static: true }) deleteModal;

  // Variavel auxiliar para a exclusao
  cursoSelecionado: Curso;

  constructor(
    private cursoService: Cursos2Service,

    // Service do Componente Modal do Bootstrap
    private modalService: BsModalService,

    // Service criado para usar o modal do Bootstrap
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // Forma antiga
    // Pegando os cursos do Banco
    // this.cursoService.list().
    //   subscribe((dados) => this.cursos = dados)

    // Puxando dados do Banco de Dados
    this.onRefresh();
  }

  onRefresh() {
    // Maneira usando Pipe Async
    // this.cursos$ = this.cursoService.list()
    //   .pipe(
    //     catchError(error => {
    //       // console.log(error);

    //       // Forma Antiga de mostrar o erro na tela
    //       // this.error$.next(true);

    //       // Forma Nova
    //       this.handleError();

    //       // Quando usar o CatchError do HTTP do Servidor, sempre precisa retornar alguma coisa
    //       return EMPTY;
    //     })
    //   );

    // Maneira usando Vetor normal para conseguir fazer o filtro mais para frente
    this.cursoService.list()
      .pipe(
        catchError(error => {
          this.handleError(error);
          return EMPTY;
        })
      )
      .subscribe((retorno) => {
        this.cursos = retorno;
      });
  }

  handleError(error) {

    console.log('Erro: ' + error);

    // Usando o Service de Modal
    this.alertService.showAlertDanger('Erro ao carregar o curso. Tente novamente mais tarde.');


    // Forma antes do Service
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar curso. Tente novamente mais tarde.';
  }

  onEdit(idCurso) {
    // Em vez de usar curso/editar, usamos o RelativeTo
    this.router.navigate(['editar', idCurso], { relativeTo: this.route });
  }

  onDelete(curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm-3' });

    const result$ = this.alertService.showConfirm('Confirmação', 'Você deseja mesmo remover o curso?', 'Sim', 'Não');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.cursoService.remove(curso.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.alertService.showAlertSuccess('Curso removido com sucesso!');
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde!');
        }
      );
  }

  onConfirmDelete() {
    this.cursoService.remove(this.cursoSelecionado.id)
      .subscribe(
        success => {
          this.alertService.showAlertSuccess('Curso removido com sucesso!');
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde!');
          this.deleteModalRef.hide();
        }
      );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
