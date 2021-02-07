import { Injectable } from '@angular/core';
import { FirebaseServiceService } from './firebase-service.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoserviceService {
  path ='carrito/';
  uid='';
  constructor(public firebaseService:FirebaseServiceService) { 

    
              
  
}
}