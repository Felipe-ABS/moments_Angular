import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText = 'Compartilhar!';

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
  }

  async createHandler(moment: Moment) { // Sempre que tiver interação com a API, deve ser usado o Async, para que possa esperar os dados chegarem
    const formData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if(moment.image) {
      formData.append("image", moment.image);
    }

    //todo

    // enviar para o service
    await this.momentService.createMoment(formData).subscribe();

    // exibir mensagem

    // redirect
  }

}
