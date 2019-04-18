import { Component, OnInit } from '@angular/core';
import { DatalisteService } from '../service/dataliste.service';
import { Projet } from '../modeles/Projet';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {

  id: number;
  modifListe: Projet;
  newId: number;
  

  constructor(private datalisteService : DatalisteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // on recupere l'id dans la route et appel les fonctions
    this.id = +this.route.snapshot.params.id;
    this.initCreerListe(this.id);
  }

 /**
  * Fonction qui va recuperer un livre suivant son id, ou qui va creer un livre vide si id est inexistant.
  * @param id 
  */
  private initCreerListe(id?: number) {
    if (id) {
      this.datalisteService.findListe(id).subscribe(
        liste => this.modifListe = liste
      );
    } else {
      this.modifListe = new Projet(0, '', '', '',new Date());
    }
  }

   /**
   * fonction qui va creer ou modifier un livre suivant si l'id existe ou pas.
   */
  onSave() {
    if (this.id) {
     this.datalisteService.updateListe(this.modifListe);
    } else {
      this.datalisteService.createListe(this.modifListe);
    }
    this.router.navigate(['/todoliste']);
  }

 
}
