import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { merge } from 'rxjs';

import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  title = 'firebase-angular-auth';
  
  isSignedIn = false
 
  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService : FirebaseServiceService) { }

  ngOnInit() {
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }
  async onSignup(email:string,password:string){
    await this.firebaseService.signup(email,password)
    
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;
    const emaail = currentUser.email;
    const name = currentUser.displayName;
    const UserData = {lastLoginTime: new Date()};
   return firebase.firestore().doc(`users/${uid}`).set(UserData,{merge:true});
    


  }
  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
   
    
    this.isSignedIn = true
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;
    const emaail = currentUser.email;
    const name = currentUser.displayName;
  }
  handleLogout(){
    this.isSignedIn = false

  }
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }
  
  
}
