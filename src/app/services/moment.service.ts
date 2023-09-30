import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moment';

import { Response } from '../Response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseAPIUrl = environment.baseAPIUrl;
  private apiUrl = `${this.baseAPIUrl}api/moments`;

  constructor(private http: HttpClient) { }

  getMoments(): Observable<Response<Moment[]>> { // Dessa maneira, consigo receber dados diferentes, que não sejam só os dados apenas do Moments
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  // Recebe no parametro os dados no formulário para que possa ser enviado para a API.
  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  removeMoment(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
