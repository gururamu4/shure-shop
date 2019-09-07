import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AdminAuthService } from "src/app/guard/admin.auth.service";

@Injectable()

export class AdminAuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AdminAuthService) { }
    canActivate() {
        if (this.authService.currentUser != null && this.authService.currentUser.isAdmin == true)
            return true;
        else
            this.router.navigate(['']);
        return false;
    }
}