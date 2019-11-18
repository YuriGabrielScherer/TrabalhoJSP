import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-search',
  templateUrl: './reactive-search.component.html',
  styleUrls: ['./reactive-search.component.css']
})
export class ReactiveSearchComponent implements OnInit {

  total = 2;
  results$ = {nome: 'Yuri', version: '2'};
  queryField = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    console.log(this.queryField.value);
  }
}
