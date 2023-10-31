import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const api = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( private http: HttpClient ) { }

  getAll() {
    return this.http.get(`${api}/api/task`);
  }

  create(tarefa: any) {
    return this.http.post(`${api}/api/task`, tarefa);
  }

  update(id: string, tarefa: any) {
    return this.http.put(`${api}/api/task/${id}`, tarefa);
  }

  delete(id: string) {
    return this.http.delete(`${api}/api/task/${id}`);
  }
}
