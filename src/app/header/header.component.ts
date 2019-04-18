import { Component, OnInit } from '@angular/core';
import { DataloginService } from '../service/datalogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: DataloginService, private router: Router) { }

  ngOnInit() {
  }

  public onLogout() {

    this.loginService.signOut();
    console.log("Deconnexion réalisée avec sucess");
    this.router.navigate(['login'])
  }
  
}
