import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moment';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseAPIUrl = environment.baseAPIUrl;
  private apiUrl = `${this.baseAPIUrl}api/moments`;

  constructor(private http: HttpClient) { }

  // Recebe no parametro os dados no formulário para que possa ser enviado para a API.
  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
