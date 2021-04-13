import { Component, OnInit } from '@angular/core';

import { FormData } from './form.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {}


  log(fd:FormData) {
    console.warn(fd);

  }

}
