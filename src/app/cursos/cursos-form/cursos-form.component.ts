import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';
// import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {
  // Variavel para armazenar o Formulario Reativo
  form: FormGroup;

  // Variavel validadora do Formulario
  submitted = false;

  constructor(
    // Construtor do Formulario
    private fb: FormBuilder,
    private cursoService: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Pegando o parametro da URL - MODO ANTIGO
    // this.route.params.subscribe( (params: any) => {
    //   const id = params['id'];
    //   const curso$ = this.cursoService.loadById(id);
    //   curso$.subscribe( ( curso ) => {
    //     this.updateForm(curso);
    //   });
    // });

    // // Retornando os cursos para editar -> ANTES DO RESOLVER
    // this.route.params
    //   .pipe(
    //     // Pegando o ID da URL
    //     map( (params: any) => params['id']),
    //     // Switch Map retornar um Observable, por isso pode colocar o loadById aqui dentro
    //     switchMap( id => this.cursoService.loadById(id)),
    //   )
    //   // Escutando as mudancas do parametro da rota, que mudará todo o Alterar da tela
    //   .subscribe( curso => this.updateForm(curso));
    //   // Nesse subscribe, como ele está feito no Parametro da Rota, o proprio Angular vai dar Unsubscribe quando a rota for mudada.

    // Esse dado de Curso é o que foi retornado pelo Resolver
    const curso = this.route.snapshot.data['curso'];

    // Criando os campos do Formulario
    this.form = this.fb.group({
      // Primeiro Campo
      id: [curso.id],
      // Segundo Campo
      nome: [
        // Parametro Inicial
        curso.nome,
        // Validacoes do Campo
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ]
    });
  }

  // Nao precisa do Update ja que temos tudo pelo resolver
  // updateForm(curso) {
  //   // Atribuindo valores para o Formulario, no caso de ser uma edicao
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.form.value);
    if (this.form.valid) {

      // Mensagens personalizadas
      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar o curso, tente novamente!';

      // Validando mensagens
      if (this.form.value.id) {
        msgSuccess = 'Curso alterado com sucesso!';
        msgError = 'Erro ao alterar o curso, tente novamente!';
      }

      // Metodo Save que fará a validacao de Insert or Update
      this.cursoService.save(this.form.value)
        .subscribe(
          success => {
            this.modal.showAlertSuccess(msgSuccess);
            this.location.back();
          },
          error => {
            this.modal.showAlertDanger(msgError);
          },
        );


      // // Validando Update ou Insert -> Feito no Service de Curso
      // if (this.form.value.id) {

      // } else {
      //   // Aqui nao precisa de Unsubscribe porque já tem no Service
      //   this.cursoService.create(this.form.value).subscribe(
      //     // Etapas do Subscribe
      //     success => {
      //       // console.log('success');
      //       this.modal.showAlertSuccess('Curso salvo com sucesso!');
      //       // Como se fosse clicar no botao de Voltar
      //       this.location.back();
      //     },
      //     error =>
      //       // console.log(error)
      //       this.modal.showAlertDanger(
      //         'Erro ao salvar o curso! Tente novamente.'
      //       ),
      //     // Quando acaba o ciclo de Subscribe
      //     () => console.log('request OK')
      //   );
      // }
    }
  }

  onCancel() {
    // Resetando variavel e Formulario
    this.submitted = false;
    this.form.reset();
    // console.log('OnCancel');
  }
}
