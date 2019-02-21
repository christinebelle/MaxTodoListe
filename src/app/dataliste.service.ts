import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todoliste } from './modeles/Todoliste';
import {map} from 'rxjs/operators';

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

  public publishListes() {
    this.getListe().subscribe(leslistes => {
      this.doliste = leslistes;
      this.todoliste$.next(this.doliste);
    });
  }

  /**
   * fonction qui permet de chercher une tâche dans la liste suivant son id
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
        return of(new Todoliste(0, '', '', ""))
      }
  }

  /**
   * fonction de création d'une liste dans la bdd, et qui rajoute une tâche a la liste afin de creer
   * un affichage dynamique
   * @param livreCreate
   */
  public createListe(listeCreate: Todoliste) {
    this.httpClient.post<Todoliste>('http://localhost:8080/api/ajouter', listeCreate).subscribe(
      newLivre => {
        this.doliste.push(newLivre);
        this.todoliste$.next(this.doliste);
      });
  }

   /**
   * fonction de modification d'un livre dans la bdd et dans la liste afin de creer une affichage dynamique
   * @param livreUpdate
   */
  public updateListe(listeUpdate: Todoliste) {
    this.httpClient.post<Todoliste>('http://localhost:8080/api/modifier', listeUpdate).subscribe(
      updatedLivre => {
        const index = this.doliste.findIndex(liste => {
          if (liste.idListe === updatedLivre.idListe) {
            return true;
          }
        });
        this.doliste[index] = listeUpdate;
        this.todoliste$.next(this.doliste);
      });
  }

  /**
   * fonction de suppression d'un livre dans la bdd et dans la liste afin de creer un affichage dynamique
   * @param idLivre
   */
  public removeLivre(idListe: number) {
    this.httpClient.delete('http://localhost:8080/api/supprime?id=' + idListe).subscribe(
      ok => {
        const index = this.doliste.findIndex(liste => {
          if (liste.idListe === idListe) {
            return true;
          }
        });
        this.doliste.splice(index, 1);
        this.todoliste$.next(this.doliste);
      });
  }

}
