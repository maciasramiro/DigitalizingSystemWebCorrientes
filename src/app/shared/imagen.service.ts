import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private url = 'http://186.109.233.31:8585/WebApi/api/image/GetImage?CarillaId=';
  
  constructor(private http: HttpClient) { }

  getImagen(id:number) : Observable<Blob>{
    //let queryParams = new HttpParams();
    //queryParams = queryParams.append('CarillaId', id);
    return this.http.get(this.url + id, { responseType: "blob" });
  }
}
