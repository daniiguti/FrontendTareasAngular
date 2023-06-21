import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {

   //Constructor
   constructor(private http: HttpClient, private router: Router) {

   }

   //Métodos auxiliares
   //Metodo para crearnos un usuario
   crearUsuario(event: Event, idUsuario: string, password: string, email: string, nombre: string){
    //evitamos, que html, automaticamente nos redireccione a la pagina: http://localhost:4200/add?usuario=aaaaa&password=aaaa&nombre=aaaa&email=aaa@112?
    event.preventDefault();
    console.log('crearUsuario')
    //El objeto json que le pasamos a la api, a diferencia de java, en ts no hay clases y se pasa mucho más facil
    const usuario = {
      idUsuario: idUsuario,
      password: password,
      email: email,
      nombre: nombre
    };
    const body=JSON.stringify(usuario);
    console.log(body)

    //Header que van en la peticion, le decimos que lo que le vamos a pasar es un json
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    //Método post, le pasamos la api, el objeto json, y el header
    this.http.post('http://localhost:9011/usuarios/', body, { headers })
      .subscribe(
        (response) => {
          console.log('Respuesta:', response);
          this.router.navigate(['/list']);
          // Realiza las acciones adicionales necesarias después de enviar los datos
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
        }
      );
   }

}
