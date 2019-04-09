import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DragDrop } from '../modeles/DragDrop';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatacheService {

  public dragTache: DragDrop[];
  dragDropTache$: BehaviorSubject<DragDrop[]> = new BehaviorSubject(this.dragTache);

  constructor(private httpClient: HttpClient) { }

  public getTache(): Observable<DragDrop[]> {
    return this.httpClient.get<DragDrop[]>('http://localhost:8080/tache');
  }

  public publishTache() {
    this.getTache().subscribe(lesTaches => {
      this.dragTache = lesTaches;
      this.dragDropTache$.next(this.dragTache);
    });
  }

  public createTache(tacheCreate: DragDrop) {
    this.httpClient.post<DragDrop>('http://localhost:8080/ajouterTache', tacheCreate).subscribe(
      newListe => {
        this.dragTache.push(newListe);
        this.dragDropTache$.next(this.dragTache);
      });
  }

  public updateListe(tacheUpdate: DragDrop) {
    this.httpClient.put<DragDrop>('http://localhost:8080/modifierTache',tacheUpdate).subscribe(
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
