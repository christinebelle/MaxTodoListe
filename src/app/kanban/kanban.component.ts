import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit} from '@angular/cdk/drag-drop';
import { DatalisteService } from '../service/dataliste.service';
import { Todoliste } from '../modeles/Todoliste';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  public position: string;

  todo = [
    'Get ',
    'Brush ',
    'Take',
    'Check',
    'Walk'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  finish = [
    'end',
    'back',
    'sleep'
  ];

  
  
  constructor(private datalisteService: DatalisteService) { }
  
  ngOnInit() {
    
    // this.datalisteService.getListe().subscribe( todolisteApi => {
      
    //   this.todo = todolisteApi;  
      
    // });
    
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
    }
  }

  getPosition(e){
        
    console.log(e) 
  }
}
