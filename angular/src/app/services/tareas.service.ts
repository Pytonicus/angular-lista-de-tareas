import { Injectable } from '@angular/core';
// Importamos la librería http:
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  // Declaramos un atributo de tipo objeto:
  tareas: object;
  // Creamos un atributo al que le pasaremos la url del servicio:
  private apiURL = 'http://localhost:8080/api/lista/';

  // Creamos el objeto por parámetros del constructor para que se inicialice:
  constructor(private http: HttpClient) { }

  // Creamos un método que obtendrá los datos de la API:
  getTareas(){
    // El método recupera los datos de la url:
    return this.http.get(this.apiURL);
  }
}
