import { Component, OnInit } from '@angular/core';
import { TareasService } from '../services/tareas.service';
// Incluimos la librería http:
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: object;
  // Declaramos el modelo como any:
  modeloTareas: any;
  // Creamos el objeto http:
  constructor(private tareasService: TareasService, private http: HttpClient) { }

  ngOnInit() {
    // Le decimos que modeloTareas es un objeto vacío:
    this.modeloTareas = {};
    this.peticionExterna();
  }
  actualizar():void{
    this.peticionExterna();
  }

  peticionExterna(){
    this.tareasService.getTareas().subscribe(data =>{
      this.tareas = data;
    },
    error =>{
      console.log("Error de conexión", error);
    }
    );
  }

  crearRegistro():void{
    // Creamos un atributo donde irán los parámetros que recibimos de ngModel:
    var parametros = {texto: this.modeloTareas.nuevoNombre};
    // Realizamos una llamada tipo post y le pasamos los parámetros:
    this.http.post('http://localhost:8080/api/lista/', parametros).subscribe(
      () =>{
        // Con la promesa llamamos a la petición externa:
        this.peticionExterna();
      }
    )
  }

}
