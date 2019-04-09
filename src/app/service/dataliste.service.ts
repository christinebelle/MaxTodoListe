import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todoliste } from '../modeles/Todoliste';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class DatalisteService {

 public doliste: Todoliste[];

 todoliste$: BehaviorSubject<Todoliste[]> = new BehaviorSubject(this.doliste);


  constructor(private httpClient: HttpClient) { }

  public getListe(): Observable<Todoliste[]> {// l'observable verfifie le type et le delais de retour
    return this.httpClient.get<Todoliste[]>('http://localhost:8080/liste');// interprete le retour JSON et lance un observable
  }

  public publishListes() {
    this.getListe().subscribe(leslistes => {
      this.doliste = leslistes;
      this.todoliste$.next(this.doliste);
    });
  }

  /**
   * fonction qui permet de chercher un projet dans la liste suivant son id
   * @param idListe
   * @return Observable<Todoliste>
   */
  public findListe(id: number): Observable<Todoliste> {
    if(id) { 
        if (!this.doliste) {
          return this.getListe().pipe(map(lites => lites.find(liste => liste.idListe === id)));
        }
        return of(this.doliste.find(liste => liste.idListe === id));
      } else {
        return of(new Todoliste(0, '', '', "",new Date()))
      }
  }

  /**
   * fonction de création d'un projet dans la bdd, et qui rajoute un projet a la liste afin de creer
   * un affichage dynamique
   * @param listeCreate
   */
  public createListe(listeCreate: Todoliste) {
    this.httpClient.post<Todoliste>('http://localhost:8080/ajouter', listeCreate).subscribe(
      newListe => {
        this.doliste.push(newListe);
        this.todoliste$.next(this.doliste);
      });
  }

   /**
   * fonction de modification d'un projet dans la bdd et dans la liste afin de creer une affichage dynamique
   * @param listeUpdate
   */
  public updateListe(listeUpdate: Todoliste) {
    this.httpClient.put<Todoliste>('http://localhost:8080/modifier',listeUpdate).subscribe(
      updatedListe => {
        const index = this.doliste.findIndex(liste => {
          if (liste.idListe === updatedListe.idListe) {
            return true;
          }
        });
        this.doliste[index] = updatedListe;
        this.todoliste$.next(this.doliste);
      });
  }

  /**
   * fonction de suppression d'un projet dans la bdd et dans la liste afin de creer un affichage dynamique
   * @param idListe
   */
  public deleteListe(idListe: number) {
    this.httpClient.delete('http://localhost:8080/supprime/' + idListe).subscribe(
      ()=> {
        const index = this.doliste.findIndex(liste => {
          if (liste.idListe === idListe) {
            return true;
          }
        },
        (error)=>{
          console.log("error", error);
        });
        this.doliste.splice(index, 1);
        this.todoliste$.next(this.doliste);
      });
  }

}
