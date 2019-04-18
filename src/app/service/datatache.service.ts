import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tache } from '../modeles/Tache';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatacheService {

  public dragTache: Tache[];
  public drogTache: Tache;
  dragDropTache$: BehaviorSubject<Tache[]> = new BehaviorSubject(this.dragTache);

  constructor(private httpClient: HttpClient) { }

  public getPositionAfaire(): Observable<Tache[]> {
    return this.httpClient.get<Tache[]>('http://localhost:8080/AFaire');
  }

  public getPositionEnCour(): Observable<Tache[]> {
    return this.httpClient.get<Tache[]>('http://localhost:8080/EnCour');
  }

  public getPositionTerminer(): Observable<Tache[]> {
    return this.httpClient.get<Tache[]>('http://localhost:8080/Terminer');
  }

  public getTache(): Observable<Tache[]> {
    return this.httpClient.get<Tache[]>('http://localhost:8080/tache');
  }

  public publishTache() {
    this.getTache().subscribe(lesTaches => {
      this.dragTache = lesTaches;
      this.dragDropTache$.next(this.dragTache);
    });
  }

  public createTache(tacheCreate: Tache) {
    this.httpClient.post<Tache>('http://localhost:8080/ajouterTache', tacheCreate).subscribe(
      newListe => {
        this.drogTache = newListe;
      });
  }

  public updateListe(tacheUpdate: Tache) {
    this.httpClient.put<Tache>('http://localhost:8080/modifierTache',tacheUpdate).subscribe(
      updatedTache => {
        const index = this.dragTache.findIndex(tache => {
          if (tache.id === updatedTache.id) {
            return true;
          }
        });
        this.dragTache[index] = updatedTache;
        this.dragDropTache$.next(this.dragTache);
      });
  }
  
}
