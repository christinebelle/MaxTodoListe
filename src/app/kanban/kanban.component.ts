import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit} from '@angular/cdk/drag-drop';
import { DatalisteService } from '../service/dataliste.service';
import { Projet } from '../modeles/Projet';
import { DatatacheService } from '../service/datatache.service';
import { Tache } from '../modeles/Tache';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  public position: string;

  public todo: Tache[];
  public done: Tache[];
  public finish: Tache[];

  constructor(private dataTacheService: DatatacheService) { }
  
  ngOnInit() {
    
    this.dataTacheService.getPositionAfaire().subscribe( listeTache => {      
      this.todo = listeTache;  
    });

    
    this.dataTacheService.getPositionEnCour().subscribe( listeTache => {      
      this.done = listeTache;  
    });

    this.dataTacheService.getPositionTerminer().subscribe( listeTache => {      
      this.finish = listeTache; 
      
    });
    
  }
    
  /**
   * methode permettant de déplacer les elements de la liste dans la liste
   * @param event 
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);      
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

                        console.log(event.container.data)
    }
  }

  getPosition(e){
        
    console.log(e) 
  }

}
