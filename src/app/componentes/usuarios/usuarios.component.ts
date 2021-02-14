import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DatePipe} from "@angular/common";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined } from 'util';
import { Usuario } from 'src/app/models';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  closeResult = '';

  UsuarioForm: FormGroup;

  idFirabaseActualizar: string;
  actualizar: boolean;
  constructor(private modalService: NgbModal,
    public fb: FormBuilder,
    private firebaseServiceService: FirebaseServiceService
  ) {
   
  }
  config: any;
  collection = { count: 0, data: [] }
  ngOnInit(): void {

    this.idFirabaseActualizar = "";
    this.actualizar = false;
    //configuracion para la productos
    this.config = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.collection.data.length
    };
    //inicializando formulario para guardar los productos
    this.UsuarioForm = this.fb.group({
      id: ['', Validators.required],
      email: ['',Validators.email],
      dir: ['', [Validators.required]],
      role:['',Validators.required]





    });

    /*
    unamePattern = "^[a-z0-9_-]{8,15}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    */
    //cargando todos los productos de firebase
    this.firebaseServiceService.getUsuarios().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          registro: e.payload.doc.data().lastLoginTime.toDate(),
          email: e.payload.doc.data().email,
          dir: e.payload.doc.data().dir,
          role:e.payload.doc.data().role,
          idFirebase: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      }
    );
  }


  pageChanged(event) {
    this.config.currentPage = event;
  }

  eliminar(item: any): void {
    this.firebaseServiceService.deleteUsuarios(item.idFirebase);
  }



  actualizarUsuario() {
    if (!isNullOrUndefined(this.idFirabaseActualizar)) {
      this.firebaseServiceService.updateUsuario(this.idFirabaseActualizar, this.UsuarioForm.value).then(resp => {
        this.UsuarioForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      });
    }
  }




  openEditar(content, item: any) {

    //llenar form para editar
    this.UsuarioForm.patchValue({
      id: item.id,
      email: item.email,
      dir: item.dir,
      role:item.role

    });
    this.idFirabaseActualizar = item.idFirebase;
    this.actualizar = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.actualizar = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}


