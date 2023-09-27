import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string;

  momentForm!: FormGroup; // Aqui o FormGroup é apenas declarado

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({ // Aqui o FormGroup é inicializado
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('')
    });
  }

  get title() {
    return this.momentForm.get('title')!; // atributo de title dentro do momentForm no FormGroup no ngOnInit, exclamação para indicar que os valores vão existir
  }

  get description() {
    return this.momentForm.get('description')!; // Colocar a exclamação pra avisar ao angular que o valor deles vão existir
  }

  submit(): void {
    if(this.momentForm.invalid) {
      return;
    }
    console.log("Enviou Formulário");
  }

}
