import { Component, OnInit, Input } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() message: string;
  @Input() type: string;

  constructor(
    // Para mostrar pro Angular que é um Modal do Boostrap
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  // Fechando o Modal
  onClose() {
    this.bsModalRef.hide();
  }
}
