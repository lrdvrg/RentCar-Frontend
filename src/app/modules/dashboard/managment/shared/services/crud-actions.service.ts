import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudActionsService {

  constructor(
    private http: HttpClient
  ) { }

  getData(type: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${type}`);
  }

  postData(type: string, body): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${type}`, body);
  }

  putData(type: string, id, body): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${type}/${id}`, body);
  }

  getSpecificData(type: string, id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${type}/${id}`);
  }

}
