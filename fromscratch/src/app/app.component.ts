import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public role: boolean = false;
  public token: any;
  public response:any;

  constructor(private readonly keycloak: KeycloakService, private http: HttpClient) {
    this.role = keycloak.isUserInRole("admin")
    this.token = keycloak.getKeycloakInstance().token
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.apiCall();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

  public apiCall(){
    this.http.get('http://127.0.0.1:3000/test',{responseType: 'text'}).subscribe((res)=> this.response = res)
  }
    
}
