import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { text } from 'body-parser';
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
  public responseOpa:any;
  public responseNoOpa:any;

  constructor(private readonly keycloak: KeycloakService, private http: HttpClient) {
    this.role = keycloak.isUserInRole("admin")
    this.token = keycloak.getKeycloakInstance().token
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.apiCallOpa()

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

  // public apiCallOpa(){
  //   const input = this.keycloak.getKeycloakInstance().token
  //   console.log(input)
  //   return this.http.post("http://localhost:3000/test", input, {responseType: "text"}).subscribe((res)=> this.responseOpa = res )
  // }

  public apiCallOpa(){
    return this.http.get("http://localhost:3000/test", {responseType: "text"}).subscribe((res) => this.responseOpa = res)
  }
}
