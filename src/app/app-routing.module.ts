import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathToFileURL } from 'url';
import { AuthComponent } from './componentes/auth/auth.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ComprasComponent } from './componentes/compras/compras.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import {map} from 'rxjs/operators'
import {canActivate} from '@angular/fire/auth-guard'

const isAdmin = (next:any) => map((user:any)  => !!user && 'eYRobvkKoqZcL3ZBrdDQ7fzmt2c2' == user.uid)

const routes: Routes = [
  { path: 'Producto', component: ProductosComponent},
  { path: 'login', component:AuthComponent},
  { path: 'usuario', component:UsuariosComponent, ...canActivate(isAdmin)},
  { path: 'compra', component:ComprasComponent},
  { path: 'carrito', component:CarritoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
