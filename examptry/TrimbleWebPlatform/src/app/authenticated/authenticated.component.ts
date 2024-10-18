import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent {


  constructor(private authService: AuthenticationService, private router: Router) {

  }

  async ngOnInit() {
    await this.authService.GetAuthCodeFromURLAndStoreInLocalStorage(this.router.url);
    let result = await this.authService.GetAccessToken();
    if (result) {
      this.router.navigate(['mainMenu']);
    }
    else {
      this.router.navigate(['authentication']);
    }
  }
}
