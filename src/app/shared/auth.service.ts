import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private url='http://186.109.233.31:8585/WebApi/api/login/authenticate';
  private url = 'http://localhost/WebApi/api/login/authenticate';
  private grantType = 'password';
  private usuarioInicioSesion = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  signIn(username: string, password: string) {
    const userLogin: Login = {
      username: username,
      password: password,
      grant_type: this.grantType,
      client_id: environment.KEY_APP
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
    /*const urlEncoded = `username=${username}&password=${password}&grant_type=${this.grantType}&client_id=${environment.KEY_APP}`;
    console.log(urlEncoded);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<token>(this.url, urlEncoded, httpOptions,)
    .pipe(
      map((token) => {
        localStorage.setItem(environment.token_name, token.access_token!);
        this.usuarioInicioSesion.next(true);
        return true;
      }),
      catchError((res: Response) => {
        return throwError(res);
      })
    );*/
    /*return this.http.post<any>(this.url, userLogin, {
      headers: requestHeader,
    }).pipe(
      map((token) => {
        localStorage.setItem(environment.token_name, token.data!);
        this.usuarioInicioSesion.next(true);
        return true;
      }),
      catchError((res: Response) => {
        return throwError(res);
      }));*/

    //return this.http.post<token>(this.url, userLogin);
    var data;
    return this.http.get<any>(`http://186.109.233.31:8585/WebApi/api/login/auth?username=${username}&password=${password}`).pipe(
      map((result) => {
        if (result.Data != null) {
          data = result.Data;
          localStorage.setItem(environment.token_name, result.Data!);
          this.usuarioInicioSesion.next(true);
          return true;
        } else {
          return false;
        }
      }),
      catchError((res: Response) => {
        return throwError(res);
      })
    );
  }
  IsLoggetIn() {
    return !!localStorage.getItem(environment.token_name);
  }

  public signOut(): void {
    localStorage.removeItem(environment.token_name);
  }

  public hasToken(): boolean {
    return this.usuarioInicioSesion.value;
  }

  public echoping() {
    const urlEcho = 'http://186.109.233.31:8585/WebApi/api/login/echoping';
    return this.http.get<any>(urlEcho);
  }
}


/*export class WebApiResponse {
  public access_token: string | null | undefined;

  constructor(accessToken?: string) {
    this.access_token = accessToken;
  }
}*/