import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from '../guards/authentication-guard.guard';

const routes: Routes = [
  {path: 'authentication', component: AuthenticationComponent},
  {path: 'authenticated', component: AuthenticatedComponent},
  {path: 'mainMenu', component: MainMenuComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent},
  {path:'**', component: AuthenticationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
