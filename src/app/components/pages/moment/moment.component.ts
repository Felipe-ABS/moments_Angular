import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';
import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';

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

  commentForm!: FormGroup;

  constructor(
      private momentService: MomentService,
      private messagesService: MessagesService,
      private commentService: CommentService,
      private route: ActivatedRoute,
      private router: Router,
    ) { }

  ngOnInit(): void {
    // Id da URL
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.momentService
      .getMoment(id)
      .subscribe((item) => this.moment = item.data);

    this.commentForm = new FormGroup({
      text: new FormControl("", Validators.required),
      username: new FormControl("", [Validators.required])
    })
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluído com sucesso");

    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if(this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data));
    this.messagesService.add("Comentário adicionado1");
    this.commentForm.reset();
    formDirective.resetForm();

  }
}
