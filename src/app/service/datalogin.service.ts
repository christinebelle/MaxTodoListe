import { Injectable } from '@angular/core';
import { Users } from '../modeles/Users';
import { HttpClient } from '@angular/common/http';
import { JsonWebToken } from '../modeles/JsonWebToken';
import { environment } from 'src/environments/environment'
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataloginService {

  userRoles: BehaviorSubject<string[]> = new BehaviorSubject([]);
  
  constructor(private httpClient: HttpClient, private router: Router) {
    this.getUserRoles();
   }

  public get loggedIn(): boolean {
    return sessionStorage.getItem(environment.accessToken) !==null;
  }

  private getUserRoles() {
    if(sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      const authorities: Array<any> = decodedToken.auth;
      this.userRoles.next(authorities.map(authority => authority.authority));
    }
  }

  public signIn(user: Users) {

    this.httpClient.post<JsonWebToken>(environment.apiUrl + 'sign-in', user).subscribe(
      token => {
        sessionStorage.setItem(environment.accessToken, token.token);

          this.getUserRoles();

          this.router.navigate(['']);
      },
      error => console.log(' Error while login'));
  }

  public signOut() {
    sessionStorage.removeItem(environment.accessToken);
  }

}
