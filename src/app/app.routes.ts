import { Routes } from '@angular/router';
import { AlquilerInfoComponent } from './components/alquiler-info/alquiler-info.component';

import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UserComponent } from './components/user/user.component';
import { VehiculoAlquilerComponent } from './components/vehiculo-alquiler/vehiculo-alquiler.component';
import { VehiculosAddComponent } from './components/vehiculos-add/vehiculos-add.component';
import { VehiculosDevolucionComponent } from './components/vehiculos-devolucion/vehiculos-devolucion.component';
import { VehiculosEditComponent } from './components/vehiculos-edit/vehiculos-edit.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';

export const RUTAS: Routes = [
    {path: 'inicio', component: InicioComponent},
    // cuando el path es vacio, refiere al componente inicio
    {path: '', pathMatch: 'full', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registrar', component: RegistroComponent},
    {path: 'user', component: UserComponent},
    {path: 'vehiculos', component: VehiculosComponent},
    {path: 'vehiculos-edit/:id', component: VehiculosEditComponent},
    {path: 'vehiculos-add', component: VehiculosAddComponent},
    {path: 'vehiculos-alquiler/:id', component: VehiculoAlquilerComponent},
    {path: 'vehiculos-devolucion', component: VehiculosDevolucionComponent},
    {path: 'vehiculos-devolucion/alquiler-info/:id', component: AlquilerInfoComponent},

    //cuando se escribe cualquier url, que no existe, redirige a inicio
    {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];