import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RUTAS } from './app.routes'; //llamos al app routes

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { VehiculosEditComponent } from './components/vehiculos-edit/vehiculos-edit.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { VehiculosAddComponent } from './components/vehiculos-add/vehiculos-add.component';
import { SesionService } from './services/sesion.service';
import { VehiculoAlquilerComponent } from './components/vehiculo-alquiler/vehiculo-alquiler.component';
import { VehiculosDevolucionComponent } from './components/vehiculos-devolucion/vehiculos-devolucion.component';
import { AlquilerInfoComponent } from './components/alquiler-info/alquiler-info.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    LoginComponent,
    UserComponent,
    VehiculosComponent,
    VehiculosEditComponent,
    VehiculosAddComponent,
    VehiculoAlquilerComponent,
    VehiculosDevolucionComponent,
    AlquilerInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(RUTAS, { useHash: true }),
    FormsModule, //se deben ingresar para que funcione el formGroup
    ReactiveFormsModule,  //se deben ingresar para que funcione el formGroup
    HttpClientModule
  ],
  providers: [SesionService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
