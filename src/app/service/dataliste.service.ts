import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Projet } from '../modeles/Projet';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class DatalisteService {

 public projetliste: Projet[];

 projetliste$: BehaviorSubject<Projet[]> = new BehaviorSubject(this.projetliste);


  constructor(private httpClient: HttpClient) { }

  public getListeProjet(): Observable<Projet[]> {// l'observable verfifie le type et le delais de retour
    return this.httpClient.get<Projet[]>('http://localhost:8080/liste');// interprete le retour JSON et lance un observable
  }

  public publishListes() {
    this.getListeProjet().subscribe(lesprojets => {
      this.projetliste = lesprojets;
      this.projetliste$.next(this.projetliste);
    });
  }

  /**
   * fonction qui permet de chercher un projet dans la liste suivant son id
   * @param idListe
   * @return Observable<Todoliste>
   */
  public findListe(id: number): Observable<Projet> {
    if(id) { 
        if (!this.projetliste) {
          return this.getListeProjet().pipe(map(litesprojet => litesprojet.find(projet => projet.idListe === id)));
        }
        return of(this.projetliste.find(projet => projet.idListe === id));
      } else {
        return of(new Projet(0, '', '', "",new Date()))
      }
  }

  /**
   * fonction de création d'un projet dans la bdd, et qui rajoute un projet a la liste afin de creer
   * un affichage dynamique
   * @param projetCreate
   */
  public createListe(projetCreate: Projet) {
    this.httpClient.post<Projet>('http://localhost:8080/ajouter', projetCreate).subscribe(
      newProjet => {
        this.projetliste.push(newProjet);
        this.projetliste$.next(this.projetliste);
      });
  }

   /**
   * fonction de modification d'un projet dans la bdd et dans la liste afin de creer une affichage dynamique
   * @param projetUpdate
   */
  public updateListe(projetUpdate: Projet) {
    this.httpClient.put<Projet>('http://localhost:8080/modifier',projetUpdate).subscribe(
      updatedProjet => {
        const index = this.projetliste.findIndex(projet => {
          if (projet.idListe === updatedProjet.idListe) {
            return true;
          }
        });
        this.projetliste[index] = updatedProjet;
        this.projetliste$.next(this.projetliste);
      });
  }

  /**
   * fonction de suppression d'un projet dans la bdd et dans la liste afin de creer un affichage dynamique
   * @param idListe
   */
  public deleteListe(idListe: number) {
    this.httpClient.delete('http://localhost:8080/supprime/' + idListe).subscribe(
      ()=> {
        const index = this.projetliste.findIndex(projet => {
          if (projet.idListe === idListe) {
            return true;
          }
        },
        (error)=>{
          console.log("error", error);
        });
        this.projetliste.splice(index, 1);
        this.projetliste$.next(this.projetliste);
      });
  }

}
