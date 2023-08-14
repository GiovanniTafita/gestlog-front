import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private name!: string;
  private host = 'http://localhost:7070/';
  private ajouter = '/ajouter';
  private modifier = '/modifier';
  private supprimer = '/supprimer';

  constructor(private http: HttpClient) { }
  
  setName (name: any) {
    this.name = name;
  }
  getAll () :Observable<any> {
    return this.http.get(this.host + this.name);
  }

  getPages (page: number, size: number ) :Observable<any> {
    return this.http.get(this.host + this.name + '/page?page='+ page +'&size=' + size);
  }

  getByid (id: string): Observable<any> {
    return this.http.get(this.host + this.name + '/' + id);
  }

  add (Data: Object): Observable<any> {
    return this.http.post(this.host + this.name + this.ajouter, Data);
  }

  update (Data: Object): Observable<any> {
    return this.http.put(this.host + this.name + this.modifier, Data);
  }

  delete (obj: Object): Observable<any> {
    return this.http.delete(this.host + this.name + this.supprimer, {body: obj});
  }

  findBy (key: string, page: number, size: number): Observable<any> {
    return this.http.get(this.host + this.name + '/find/' + key +'?page='+page+'&size='+size);
  }
  
}
