import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


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
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.data.length
    };
    //inicializando formulario para guardar los productos
    this.UsuarioForm = this.fb.group({
      id: ['', Validators.required],
      email: ['', Validators.required],
      dir: ['', Validators.required]





    });
    //cargando todos los productos de firebase
    this.firebaseServiceService.getUsuarios().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          registro: e.payload.doc.data().lastLoginTime.toDate(),
          email: e.payload.doc.data().email,
          dir: e.payload.doc.data().dir,
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
    this.firebaseServiceService.deleteProductos(item.idFirebase);
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
    this.UsuarioForm.setValue({
      id: item.id,
      email: item.email,
      dir: item.dir

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


