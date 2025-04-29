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

  getEmpleado(id: string):Observable<any> {
    return this.http.get(`${this.apiUrl}/empleado/${id}`)
  }

  getDisponibilidad():Observable<any> {
    return this.http.get(`${this.apiUrl}/empleado`)
  }

  getEventos():Observable<any> {
    return this.http.get(`${this.apiUrl}/evento`)
  }

  getEvento(id: number):Observable<any> {
    return this.http.get(`${this.apiUrl}/evento/${id}`)
  }

  insertEvento(json: any) {
    return this.http.post("http://localhost:3000/evento", {json});
  }

  insertEmpleado(json: any) {
    return this.http.post("http://localhost:3000/empleados", {json});
  }

  changeEmpleado(json: any) {
    return this.http.patch("http://localhost:3000/empleados", {json});
  }
  changeEvento(json: any) {
    return this.http.patch("http://localhost:3000/evento", {json});
  }
}