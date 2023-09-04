import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonaRequest } from 'src/app/models/persona_request';
import { PersonaService } from 'src/app/shared/persona.service';
import { MatTableDataSource } from '@angular/material/table';
import { SearchResult } from 'src/app/models/search_result';
import { Documento, WebApiResponse } from 'src/app/models/documento_response';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { VisualizadorDialogComponent } from '../visualizador-dialog/visualizador-dialog.component';
import { LoadingIndicatorService } from 'src/app/shared/services/loading-indicator.service';


@Component({
  selector: 'app-find-persona',
  templateUrl: './find-persona.component.html',
  styleUrls: ['./find-persona.component.scss']
})
export class FindPersonaComponent {
  apellido: string = '';
  nombre: string = '';
  nrodoc: string = '';
  legajo: string = '';
  searchResult: SearchResult[] = [];
  resultDocumento: Documento | undefined;
  loading = false;


  displayedColumns: string[] = ['Id', 'NombreCompleto', 'NroDocumento', 'TipoDocumento', 'actions'];

  dataSource = new MatTableDataSource<SearchResult>();

  constructor(private personaService: PersonaService, private toastr: ToastrService,public  loadingIndicatorService: LoadingIndicatorService, private dialog: MatDialog) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  limpiar() {
    this.apellido = '';
    this.nombre = '';
    this.nrodoc = '';
    this.legajo = '';
    this.dataSource = new MatTableDataSource<SearchResult>();
  }
  search() {
    if (this.apellido == '' && this.nombre == '' && this.nrodoc == '' && this.legajo == '') {
      this.toastr.error('Debe ingresar al menos un campo para la busqueda', 'Error');
      return;
    }

    var personaRequest = new PersonaRequest(this.apellido, this.nombre, this.nrodoc, this.legajo);

    this.loadingIndicatorService.showLoading();
    this.personaService.find(personaRequest).subscribe((response: any) => {
      if (response.Success && response.Data != null) {
        this.dataSource.data = response.Data;
        this.loadingIndicatorService.hideLoading();
      } else {
        this.toastr.error('Error al buscar Personas', 'Advertencia');
        this.loadingIndicatorService.hideLoading();
        return;
      }
    });

  }

  getRecord(row: SearchResult) {
    this.personaService.getDocumento(row).subscribe((response: WebApiResponse) => {
      if (response.Data != null) {
        this.resultDocumento = response.Data;
        let dialogReg = this.dialog.open(VisualizadorDialogComponent, {
          height: '90%',
          width: '90%',
          data: this.resultDocumento
        });
      }
    });
  }
}
