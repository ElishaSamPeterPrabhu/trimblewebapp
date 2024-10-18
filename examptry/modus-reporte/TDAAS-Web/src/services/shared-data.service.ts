import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private tidIdTokenDecoded: any;

  setTidIdTokenDecoded(value: any) {
    this.tidIdTokenDecoded = value;
  }

  getTidIdTokenDecoded() {
    return this.tidIdTokenDecoded;
  }
}
