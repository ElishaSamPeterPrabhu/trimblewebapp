import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { Code2CodeComponent } from './code2-code/code2-code.component';
import { Prompt2CodeComponent } from './prompt2-code/prompt2-code.component';
import { HttpClientModule } from '@angular/common/http';
// import { Prompt2CodeOutputCom  ponent } from './prompt2-code-output/prompt2-code-output.component';
import { SampleComponent } from './sample/sample.component';
import { Image2CodeComponent } from './image2-code/image2-code.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { LogoutComponent } from './logout/logout.component';
import { AssistantService } from '../services/assistant.service';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    Code2CodeComponent,
    Prompt2CodeComponent,
    // Prompt2CodeOutputComponent,
    SampleComponent,
    Image2CodeComponent,
    AuthenticationComponent,
    AuthenticatedComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, AssistantService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
