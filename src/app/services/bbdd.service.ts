import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Bbdd {
  private apiUrl = 'http://localhost:3000'; // URL de tu API

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/empleado`);
  }


  getEventos():Observable<any> {
    return this.http.get(`${this.apiUrl}/evento`)
  }
}