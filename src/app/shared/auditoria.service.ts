import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WebApiResponse } from '../models/documento_response';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  private url = environment.api + '/auditoria/';
  constructor(private http: HttpClient) { }

  getLotes(page: number, pageSize: number, idUsuario:number){
    let queryParams = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('idUsuario', idUsuario);
    return this.http.get<WebApiResponse>(this.url + `GetLotes`,{ params: queryParams });
  }

  getDocumentosLote(page: number, pageSize: number, idLote:number){
    let queryParams = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize)
    .set('idLote', idLote);
    return this.http.get<WebApiResponse>(this.url + `GetDocumentosLote`,{ params: queryParams });
  }

  getDocumentoById(id:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);
    return this.http.get<WebApiResponse>(this.url + '/GetDocumentoById' ,{ params: queryParams });
  }
}
