import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGaurdService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return this.auth.isAuthenticated();
    } else {
      this.router.navigate(["login"]);
      return this.auth.isAuthenticated();
    }
  }
}
