import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth'
import { Producto } from '../models'
import { auth } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  isLoggedIn = false
  constructor(
    public firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }


  //AUTENTICACION

  //ENTRAR
  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }
  //REGISTRARSE
  async signup(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })


  }
  async getUID() {
    const user = await this.firebaseAuth.currentUser;
    if (user === null) {
      return "no hay sesion";
    } else {
      return user.uid;
    }

  }
  //DESLOGEARSE
  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')

  }


  //SERVICIOS PARA PRODUCTO

  /**
   * Metodo para listar todos los productos
   */
  getProductos() {
    return this.firestore.collection("Producto").snapshotChanges();
  }

  /**
   * crea un producto en firebase
   * @param estudiante estudiante a crear
   */
  createProductos(Producto: Producto) {
    return this.firestore.collection("Producto").add(Producto);
  }

  /**
   * 
  
   * @param Producto Producto a actualizar
   */
  updateProductos(id: any, Producto: Producto) {
    return this.firestore.collection("Producto").doc(id).update(Producto);
  }


  /**
   * borrar un estudiante existente en firebase
   * @param id id de la coleccion en firebase
   */
  deleteProductos(id: any) {
    return this.firestore.collection("Producto").doc(id).delete();


  }



  //SERVICIOS DE USUARIO
  deleteUsuarios(id: any) {
    return this.firestore.collection("users").doc(id).delete();
  }


  getUsuarios() {
    return this.firestore.collection("users").snapshotChanges();
  }

  //actualizar usuario

  updateUsuario(id: any, Usuario: any) {
    return this.firestore.collection("users").doc(id).update(Usuario);
  }




}
