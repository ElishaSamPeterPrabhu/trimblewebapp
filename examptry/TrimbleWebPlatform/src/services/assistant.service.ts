import { Injectable } from '@angular/core';
import { get } from '../config/prod-config';
import { getItemFromLocalStorage } from '../utils/localstorage-utils';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  constructor(private sharedDataService: SharedDataService) { }

  public async GetAssistantResponseForMessage(message: string): Promise<string | undefined> {
    let parameters = {
      "message": message,
      "stream": false,
      "model_id": "gpt-4o",
      "session_id": this.sharedDataService.getTidIdTokenDecoded().jti,
    }
    const formBody = JSON.stringify(
      Object.fromEntries(
        Object.entries(parameters).map(([key, value]) => [key, value ?? ''])
      )
    );

    const accessToken = getItemFromLocalStorage("accessToken")
    const response: any = await fetch(get("trimbleAssistantMessageURL"), {
      headers: new Headers(
        {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      ),
      method: 'POST',
      body: formBody,
    })

    if (response.status !== 200) {
      return undefined;
    }

    const responseData = await response.json();
    return responseData.message;
  }

}



