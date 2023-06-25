import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit{
  usuario: any;
  idUsuario: string | null = null;
  lineas: any[] = [];

  //campos de la vista para usarlos
  @ViewChild('inputPassword', { static: false }) passwordInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('inputEmail', { static: false }) emailInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('inputNombre', { static: false }) nombreInputRef!: ElementRef<HTMLInputElement>;

  //campos de la vista para limpiarlos, los de lineas
  @ViewChild('titleInput', { static: false }) titleInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('descripcionInput', { static: false }) descripcionInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('statusInput', { static: false }) statusInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('diaInput', { static: false }) diaInputRef!: ElementRef<HTMLInputElement>;


  constructor(private http: HttpClient, private route: ActivatedRoute){

  }

  //Método de la interfaz OnInit, para cuando se cree el componente, se llame a este metodo, obtenemos el idUsuario de
  //la url y cargamos el usuario de nuestra api
  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('idUsuario');
    console.log('idUsuario: ' + this.idUsuario);
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(){
    // Hacemos una peticion a la api propia
    this.http.get<any>('http://localhost:9011/usuarios/' + this.idUsuario + '/contareas')
    .subscribe(
      (usuarioApi: any) => {
        this.usuario = usuarioApi;
        this.lineas = usuarioApi.listaTareas;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  addTarea(titleInput: string, descripcionInput: string, statusInput: string, diaInput: string){
    console.log(titleInput, descripcionInput, statusInput, diaInput);

    //El objeto json que le pasamos a la api, a diferencia de java, en ts no hay clases y se pasa mucho más facil
    const tarea = {
      title: titleInput,
      descripcion: descripcionInput,
      status: statusInput,
      dia: diaInput,
      userId: this.idUsuario
    };
    const body=JSON.stringify(tarea);

    //Header que van en la peticion, le decimos que lo que le vamos a pasar es un json
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    //Método post, le pasamos la api, el objeto json, y el header
    this.http.post('http://localhost:9011/usuarios/tareas/' + this.idUsuario, body, { headers })
      .subscribe(
        (response) => {
          //al añadir una tarea, nos devuelve esa misma tarea, la añadimos a la tabla
          this.lineas.push(response);
          //limpiamos los campos del form
          this.clearForm();
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
        }
      );
  }

  clearForm() {
    this.titleInputRef.nativeElement.value = '';
    this.descripcionInputRef.nativeElement.value = '';
    this.statusInputRef.nativeElement.value = '';
    this.diaInputRef.nativeElement.value = '';
  }

  deleteTarea(idTarea: number){
    this.http.delete('http://localhost:9011/usuarios/tareas/' + this.idUsuario + '/' + idTarea).
    subscribe(
      (response) => {
        alert("Tarea con id: " + idTarea + "eliminada")
        this.lineas = this.lineas.filter((linea) => linea.idTarea !== idTarea);
      },
      (error) => {
        alert("No se pudo eliminar")
      } 
    );
  }

  modificarUsuario(password: string, email: string, nombre: string){
    console.log(password, email, nombre);
    
    //El objeto json que le pasamos a la api, a diferencia de java, en ts no hay clases y se pasa mucho más facil
    const usuario = {
      password: password,
      email: email,
      nombre: nombre
    };
    const body=JSON.stringify(usuario);

    //Header que van en la peticion, le decimos que lo que le vamos a pasar es un json
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    //Método post, le pasamos la api, el objeto json, y el header
    this.http.put('http://localhost:9011/usuarios/' + this.idUsuario, body, { headers })
      .subscribe(
        (response: any) => {
          const userModificado = response;
          this.passwordInputRef.nativeElement.value = userModificado.password;
          this.emailInputRef.nativeElement.value = userModificado.email;
          this.nombreInputRef.nativeElement.value = userModificado.nombre;
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
        }
      );
  }
  modificarTarea(idTarea: string, title: string, descripcion: string, status: string, dia: string){
    
    //El objeto json que le pasamos a la api, a diferencia de java, en ts no hay clases y se pasa mucho más facil
    const tareaNueva = {
      title: title,
      descripcion: descripcion,
      status: status,
      dia: dia
    };
    const body=JSON.stringify(tareaNueva);

    //Header que van en la peticion, le decimos que lo que le vamos a pasar es un json
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //encontramos el index de la tarea
    const index = this.lineas.findIndex((linea) => linea.idTarea === idTarea);

    //Método post, le pasamos la api, el objeto json, y el header
    this.http.put('http://localhost:9011/usuarios/tareas/' + this.idUsuario + '/' + idTarea, body, { headers })
      .subscribe(
        (response: any) => {
          const tareaModificada = response;
          this.lineas[index] = tareaModificada;
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
        }
      );
  }
}
