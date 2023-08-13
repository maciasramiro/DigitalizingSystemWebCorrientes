import { Injectable } from '@angular/core';
import { PersonaRequest } from '../models/persona_request';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WebApiResponse } from '../models/documento_response';
import { SearchResult } from '../models/search_result';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private url = 'http://186.109.233.31:8585/WebApi/api/persona/GetPersonas';
  private urlDocumento = 'http://186.109.233.31:8585/WebApi/api/persona/GetDocumento';

  constructor(private http: HttpClient) { }

  find(personaRequest: PersonaRequest) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('apellido', personaRequest.Apellido);
    queryParams = queryParams.append('nombre', personaRequest.Nombre);
    queryParams = queryParams.append('nrodocumento', personaRequest.NroDocumento);
    queryParams = queryParams.append('legajo', personaRequest.NroLegajo);
    return this.http.get<any>(this.url, { params: queryParams });
  }
  
  getDocumento(row:SearchResult){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', row.Id);
    queryParams = queryParams.append('nombreCompleto', row.NombreCompleto);
    queryParams = queryParams.append('nrodoc', row.NroDocumento);
    queryParams = queryParams.append('tipodoc', row.TipoDocumento);
    return this.http.get<WebApiResponse>(this.urlDocumento, { params: queryParams });
  }
}
