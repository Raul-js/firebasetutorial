import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth'


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  isLoggedIn = false
  constructor(
    public firebaseAuth : AngularFireAuth,
    private firestore: AngularFirestore
  ) { }


                                    //AUTENTICACION

                                    //ENTRAR
  async signin(email: string, password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
                                    //REGISTRARSE
  async signup(email: string, password : string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })

  }
  
                                //DESLOGEARSE
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }


                               //SERVICIOS PARA PRODUCTO

  /**
   * Metodo para listar todos los productos
   */
  getProductos(){
    return this.firestore.collection("Producto").snapshotChanges();
  }

  /**
   * crea un producto en firebase
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
  getUserAuth(){
   
    return this.firebaseAuth;
  }
}
