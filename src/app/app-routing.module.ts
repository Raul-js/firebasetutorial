import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';
import { pathToFileURL } from 'url';
import { AuthComponent } from './componentes/auth/auth.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ComprasComponent } from './componentes/compras/compras.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import {map, take,filter} from 'rxjs/operators'
import {canActivate} from '@angular/fire/auth-guard'
import { AuthGuard } from './shared/guards/auth.guard';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['']);

type FirebaseUser = import('firebase/app').User;


 





const routes: Routes = [
  { path: 'Producto', component: ProductosComponent},
    
    
  { path: 'login', component:AuthComponent},
  { path: 'usuario', component:UsuariosComponent,canActivate:[AuthGuard]},
  { path: 'compra', component:ComprasComponent},
  { path: 'carrito', component:CarritoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
