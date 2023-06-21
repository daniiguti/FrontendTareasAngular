import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit{
  
  datos: any[] = [];

  //Constructor
  constructor(private http: HttpClient) {

  }
  //Método de la interfaz OnInit, para cuando se cree el componente, se llame a este metodo, cargamos los usuarios de nuestra api
  ngOnInit(): void {
    this.cargarDatosUsuarios();
  }

  cargarDatosUsuarios(){
    // Hacemos una peticion a la api propia
    this.http.get<any[]>('http://localhost:9011/usuarios/')
    .subscribe(
      (usuarios: any[]) => {
        this.datos = usuarios;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarUsuario(idUsuario: string){
    console.log('idUsuario: ' + idUsuario)
    this.http.delete('http://localhost:9011/usuarios/' + idUsuario)
      .subscribe(
        () => {
          console.log('Usuario eliminado correctamente.');
          //Una vez eliminado, cargamos los datos, menos el que hemos eliminado, usando la función filter
          //dato -> cada elemento del arreglo
          //recorremos el arreglo y dejamos los datos cuyo idUsuario sea distinto del que hemos pasado por parámetro a la funcion y eliminado
          this.datos = this.datos.filter((dato) => dato.idUsuario !== idUsuario);
        },
        (error) => {
          console.error('Error al eliminar usuarios:', error);
        }
      );

  }

  modificarUsuario(idUsuario: String){
    console.log('idUsuario: ' + idUsuario)
  }
}
