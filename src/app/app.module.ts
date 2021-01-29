import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ProductosComponent } from './componentes/productos/productos.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ComprasComponent } from './componentes/compras/compras.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    AuthComponent,
    UsuariosComponent,
    ComprasComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
