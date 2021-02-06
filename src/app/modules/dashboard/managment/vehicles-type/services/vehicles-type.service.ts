import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesTypeService {

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/VehicleTypes`);
  }
}
