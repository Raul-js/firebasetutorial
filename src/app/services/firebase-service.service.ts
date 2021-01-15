import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  /**
   * Metodo para listar todos los estudiantes
   */
  getProductos(){
    return this.firestore.collection("Producto").snapshotChanges();
  }

  /**
   * crea un estudiante en firebase
   * @param estudiante estudiante a crear
   */
  createProductos(Producto:any){
    return this.firestore.collection("Producto").add(Producto);
  }

  /**
   * actualiza un estudiante existente en firebase
   * @param id id de la coleccion en firebase
   * @param Producto estudiante a actualizar
   */
  updateProductos(id:any, Producto:any){
    return this.firestore.collection("Producto").doc(id).update(Producto);
  }


  /**
   * borrar un estudiante existente en firebase
   * @param id id de la coleccion en firebase
   */
  deleteProductos(id:any){
    return this.firestore.collection("Producto").doc(id).delete();

  }
}
