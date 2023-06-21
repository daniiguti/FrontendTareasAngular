import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VerUsuariosComponent,
    AddUsuarioComponent,
    NavmenuComponent,
    DetalleUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
