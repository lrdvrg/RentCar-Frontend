import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Usuarios`);
  }

  postUser(body): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Usuarios`, body);
  }

  putUser(id, body): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Usuarios/${id}`, body);
  }

  getSpecificUser(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Usuarios/${id}`);
  }

}
