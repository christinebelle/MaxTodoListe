import { Component } from '@angular/core';
import { DatalisteService } from './dataliste.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'La To Do Liste de Maxime';

  constructor(private dataListeService: DatalisteService) {}

  ngOnInit() {
    this.dataListeService.getListes();
}
}
