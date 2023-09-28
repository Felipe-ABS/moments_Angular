import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';

import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseAPIUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      })

      this.allMoments = data;
      this.moments = data;

    });
  }

  search(e: Event): void {
    // target -> aqui eu estou pegando o que foi escrito dentro do meu input
    // Como um elemento input do HTML, ja que eu não consigo pegar diretamente do evento
    // const target = e.target as HTMLInputElement;
    const target = e.target as HTMLInputElement;
    const value = target.value;

    // Neste caso aqui, deve usar apenas a arrowFunction sem as chaves, para que ele possa retornar o valor
    this.moments = this.allMoments.filter(moment =>
      moment.title.toLowerCase().includes(value)
    )
  }

}
