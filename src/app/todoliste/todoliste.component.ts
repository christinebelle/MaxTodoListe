import { Component, OnInit, ViewChild } from '@angular/core';
import { DatalisteService } from '../service/dataliste.service';
import { Projet } from '../modeles/Projet';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todoliste',
  templateUrl: './todoliste.component.html',
  styleUrls: ['./todoliste.component.scss']
})
export class TodolisteComponent implements OnInit {

  
  displayedColumns: string[] = ['idListe', 'nomListe', 'decritListe', 'dateListe', 'evolListe','modif','Supp'];
  dataSource = new MatTableDataSource<Projet>() ;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(private datalisteService: DatalisteService, private router: Router) { }

  ngOnInit() {  
    
    this.datalisteService.projetliste$.subscribe( todolisteApi => {

      this.dataSource.data = todolisteApi;        
      this.dataSource.paginator = this.paginator;
    });  
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onDelete(id: number) {
    this.datalisteService.deleteListe(id);   
    
  }
}
