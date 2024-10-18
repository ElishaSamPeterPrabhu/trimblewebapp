import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { AuthenticationService } from 'src/services/authentication.service';
import { AssistantService } from 'src/services/assistant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prompt2-code',
  templateUrl: './prompt2-code.component.html',
  styleUrls: ['./prompt2-code.component.css']
})
export class Prompt2CodeComponent {
  public userPromptTextAreaLabel: string = "Query to get similar Issues";
  public userPromptTextAreaPlaceholder: string = "Post your query";
  public userPromptHelperText: string = "For better results keep your query as detailed and accurate as possible. It might take ~1minute to get the output.";

  public progressBarValue = 0;
  public progressBarMaxValue = 5;
  public progressBarHidden = true;
  private progressBarIntervalId: any = null;
  public showAlert: boolean = false;

  public responses: { markdown: string, renderedMarkdown: SafeHtml }[] = [];

  constructor(private authService: AuthenticationService,
              private assistantService: AssistantService,
              private sanitizer: DomSanitizer,
              private router: Router) { }

  public async generateClicked(textArea: any) {
    console.log(textArea.value);
    this.showAlert = false;
    this.displayProgressBar();
    var isAuthorized = await this.authService.ValidateAuthentication();
    if (!isAuthorized) {
      this.router.navigate(['authentication']);
      return;
    }

    var response = await this.assistantService.GetAssistantResponseForMessage(textArea.value);
    console.log("Response result is " + response);
    this.progressBarValue = 0;
    this.progressBarHidden = true;
    this.onResponseReceived();

    if (response == undefined) {
      this.showAlert = true;
      return;
    }

    const renderedMarkdown = this.renderMarkdown(response);
    this.responses.unshift({ markdown: response, renderedMarkdown: renderedMarkdown }); // Prepend new response
    textArea.value = ''; // Clear the input field
  }

  private renderMarkdown(markdown: string): SafeHtml {
    console.log('Rendering markdown:', markdown);
    const markdownString = marked(markdown) as string;
    console.log('Parsed markdown:', markdownString);
    return this.sanitizer.bypassSecurityTrustHtml(markdownString);
  }

  private displayProgressBar() {
    this.progressBarHidden = false;
    this.progressBarIntervalId = setInterval(() => {
      this.progressBarValue++;
      if (this.progressBarValue == this.progressBarMaxValue - 1) {
        clearInterval(this.progressBarIntervalId);
      }
    }, 10000);
  }

  private onResponseReceived() {
    if (this.progressBarIntervalId !== null) {
      clearInterval(this.progressBarIntervalId);
      this.progressBarIntervalId = null;
    }
  }
}
