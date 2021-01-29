import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(public firebaseService : FirebaseServiceService) { }

  ngOnInit(): void {

     
   
  }

}
