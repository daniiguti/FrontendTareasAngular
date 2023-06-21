import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';


const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'add', component:AddUsuarioComponent},
  {path: 'list', component:VerUsuariosComponent},
  {path: 'userdetail/:id', component: DetalleUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
