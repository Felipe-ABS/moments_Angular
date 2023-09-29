import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseAPIUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
      private momentService: MomentService,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // Id da URL
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.momentService
      .getMoment(id)
      .subscribe((item) => this.moment = item.data);
  }

}
