import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tarea-individual',
  templateUrl: './tarea-individual.component.html',
  styleUrls: ['./tarea-individual.component.css']
})
export class TareaIndividualComponent implements OnInit {
  @Input()
  tareaInfo: any;

  @Output()
  cambioTarea: EventEmitter<number> = new EventEmitter();

  mostrarDatos: boolean;
  // Vamos a definir el atributo de tipo any:
  tareaModel: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Ahora vamos a tener el modelo listo en blanco:
    this.tareaModel = {};
  }

  activarEdicion(nombre:String):void{
    this.mostrarDatos = true;
    // Vamos a pasarle el parametro nombre al atributo tareaMdoel:
    this.tareaModel.nombre = nombre;
  }

  // Cargamos la función que actualizará el registro y le pasamos el nombre:
  editarTarea(tareaInfo){
    // Vamos a pasarle el parametro texto que cambiará el campo del identificador texto:
    var parametros = { texto: this.tareaModel.nombre }
    // Ahora enviamos la información al servidor:
    this.http.put('http://localhost:8080/api/lista/' + tareaInfo._id, parametros).subscribe(
      () =>{
        this.cambioTarea.emit();
      }
    );
  }

  borrarRegistro(tareaInfo):void{
    this.http.delete('http://localhost:8080/api/lista/' + tareaInfo._id).subscribe(
      () =>{
        this.cambioTarea.emit();
      }
    );
  }

}
