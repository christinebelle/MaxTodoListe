import { Component, OnInit } from '@angular/core';
import { DatatacheService } from '../service/datatache.service';
import { DragDrop } from '../modeles/DragDrop';
import { Router } from '@angular/router';
import { DatalisteService } from '../service/dataliste.service';

@Component({
  selector: 'app-creer-kanban',
  templateUrl: './creer-kanban.component.html',
  styleUrls: ['./creer-kanban.component.scss']
})
export class CreerKanbanComponent implements OnInit {

  newTache : DragDrop;
  listeprojets;

  constructor( private dataTacheService: DatatacheService, private dataListeService: DatalisteService, private router: Router) { }

  ngOnInit() {

    this.newTache = new DragDrop(0,'','',0);

    this.listeprojets = this.dataListeService.getListe();
    this.listeprojets.subscribe( lesprojets => {
      this.listeprojets = lesprojets;
      console.log(this.listeprojets)
    })
    
  }

  
  onSave() {

    this.dataTacheService.createTache(this.newTache);

    this.router.navigate(['/kanban']);
  }
}
