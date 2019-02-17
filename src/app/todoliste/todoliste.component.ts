import { Component, OnInit, ViewChild } from '@angular/core';
import { DatalisteService } from '../dataliste.service';
import { Todoliste } from '../modeles/Todoliste';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-todoliste',
  templateUrl: './todoliste.component.html',
  styleUrls: ['./todoliste.component.scss']
})
export class TodolisteComponent implements OnInit {

  
  displayedColumns: string[] = ['idListe', 'nomListe', 'decritListe', 'evolListe'];
  dataSource = new MatTableDataSource<Todoliste>() ;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(private datalisteService: DatalisteService) { }

  ngOnInit() {
    
    
    this.datalisteService.getListe().subscribe( todolisteApi =>
      this.dataSource = new MatTableDataSource(todolisteApi));  
      
      this.dataSource.paginator = this.paginator;
    
  }
}
