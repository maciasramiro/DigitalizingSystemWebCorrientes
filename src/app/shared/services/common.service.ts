import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private url = environment.api + '/common/';

  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<any>(this.url + 'GetUsuarios');
  }
}
