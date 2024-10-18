import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {
    window.location.href = this.authService.GetAuthCodeUrl();
  }

}
