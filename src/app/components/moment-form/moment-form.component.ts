import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup; // Aqui o FormGroup é apenas declarado

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({ // Aqui o FormGroup é inicializado
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
      image: new FormControl('')
    });
  }

  get title() {
    return this.momentForm.get('title')!; // atributo de title dentro do momentForm no FormGroup no ngOnInit, exclamação para indicar que os valores vão existir
  }

  get description() {
    return this.momentForm.get('description')!; // Colocar a exclamação pra avisar ao angular que o valor deles vão existir
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.momentForm.patchValue({image: file});
  }

  submit(): void {
    if(this.momentForm.invalid) {
      return;
    }
    console.log("MomentForm Value: ", this.momentForm.value);
    console.log("Enviou Formulário");
    this.onSubmit.emit(this.momentForm.value);
  }


}
