import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Ok';

  // O componente de Modal vai retornar true or false atraves desse Subject
  confirmResult: Subject<boolean>;

  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  onClose() {
    this.confirmAndClose(false);
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  private confirmAndClose(valor) {
    this.confirmResult.next(valor);
    this.bsModalRef.hide();
  }

}
