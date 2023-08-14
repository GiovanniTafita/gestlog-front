import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService extends CrudService {

  constructor(http: HttpClient) {
    super(http);
    this.setName('fournisseur');
   }
}
