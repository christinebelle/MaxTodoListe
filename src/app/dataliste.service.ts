import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todoliste } from './modeles/Todoliste';

@Injectable({
  providedIn: 'root'
})
export class DatalisteService {

 public doliste: Todoliste[];

 todoliste$: BehaviorSubject<Todoliste[]> = new BehaviorSubject(this.doliste);

  constructor(private httpClient: HttpClient) { }

  public getListe(): Observable<Todoliste[]> {// l'observable verfifie le type et le delais de retour
    return this.httpClient.get<Todoliste[]>('http://localhost:8080/api/liste');// interprete le retour JSON et lance un observable
  }

  public getListes() {
    this.getListe().subscribe(leslistes => {
      this.doliste = leslistes;
      this.todoliste$.next(this.doliste);
    });
  }

  
}
