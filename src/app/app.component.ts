import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from './services/firebase-service.service';
import { isNullOrUndefined } from 'util';
import { Subscriber } from 'rxjs';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSignedIn: boolean;
  
  
  
 

  constructor(public firebaseService: FirebaseServiceService) {


    if(localStorage.getItem('user')!=null){
      this.isSignedIn=true
    }
   }

  config: any;
  collection = { count: 0, data: [] }
  
   ngOnInit() {
    
  
    
   
      
    
   
  


   
  
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
