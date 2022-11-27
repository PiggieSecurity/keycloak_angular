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

  constructor(private readonly keycloak: KeycloakService) {
    this.role = keycloak.isUserInRole("admin")
    this.token = keycloak.getKeycloakInstance().token
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

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

    
}
