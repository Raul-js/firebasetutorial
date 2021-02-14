import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined } from 'util';
import {Producto} from 'src/app/models';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

   oculto=false;
  closeResult = '';

  ProductoForm: FormGroup;

  idFirabaseActualizar: string;
  actualizar: boolean;
  isSignedIn: boolean;
  constructor(private modalService: NgbModal,
    public fb: FormBuilder,
    private firebaseServiceService: FirebaseServiceService,
    ) {

      if(localStorage.getItem('user')!=null){
        this.isSignedIn=true
      }
     }

  config: any;
  collection = { count: 0, data: [] }
  
  imprimirLista(){
    const DATA = document.getElementById('tabla');
    
    const doc = new jsPDF('p', 'pt', 'a2');
    
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
   
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}ListaProducto.pdf`);
    });
    
   }
  
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
    this.ProductoForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      calorias: ['', Validators.required],
      fecha: ['', Validators.required]


    });
    //cargando todos los productos de firebase
    this.firebaseServiceService.getProductos().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          nombre: e.payload.doc.data().nombre,
          precio: e.payload.doc.data().precio,
          calorias: e.payload.doc.data().calorias,
          fecha: e.payload.doc.data().fecha,

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

  guardarProducto(): void {
    this.firebaseServiceService.createProductos(this.ProductoForm.value).then(resp => {
      this.ProductoForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error)
    })
  }

  actualizarProducto() {
    if (!isNullOrUndefined(this.idFirabaseActualizar)) {
      this.firebaseServiceService.updateProductos(this.idFirabaseActualizar, this.ProductoForm.value).then(resp => {
        this.ProductoForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      });
    }
  }




  openEditar(content, item: any) {

    //llenar form para editar
    this.ProductoForm.patchValue({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      calorias: item.calorias,
      fecha:item.fecha
      
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


