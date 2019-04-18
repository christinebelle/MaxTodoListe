import { Component, OnInit } from '@angular/core';
import { DatatacheService } from '../service/datatache.service';
import { Tache } from '../modeles/Tache';
import { Router } from '@angular/router';
import { DatalisteService } from '../service/dataliste.service';
import { Projet } from '../modeles/Projet';

@Component({
  selector: 'app-creer-kanban',
  templateUrl: './creer-kanban.component.html',
  styleUrls: ['./creer-kanban.component.scss']
})
export class CreerKanbanComponent implements OnInit {

  newTache : Tache;
  listeprojets;

  constructor( private dataTacheService: DatatacheService, private dataListeService: DatalisteService, private router: Router) { }

  ngOnInit() {

    this.newTache = new Tache(0,'','',new Projet(0,"a","a","a",new Date()));

    console.log(this.newTache)

    this.listeprojets = this.dataListeService.getListeProjet();
    this.listeprojets.subscribe( lesprojets => {
      this.listeprojets = lesprojets;
    })
    
  }

  
  onSave() {

    this.dataTacheService.createTache(this.newTache);
    console.log(this.newTache)
    this.router.navigate(['/']);
  }
}
