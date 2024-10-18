import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  public getDataFromBackend(url: string, input: string, model: string): Observable<Object> {
    const params = { input, model }
    return this.http.get<string>(url, { params });
  }
}
