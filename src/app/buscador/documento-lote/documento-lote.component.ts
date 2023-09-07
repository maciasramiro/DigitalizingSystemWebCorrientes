import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Documento, WebApiResponse } from 'src/app/models/documento_response';
import { AuditoriaService } from 'src/app/shared/auditoria.service';
import { DetailComponentComponent } from '../detail-component/detail-component.component';
import { LoadingIndicatorService } from 'src/app/shared/services/loading-indicator.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-documento-lote',
  templateUrl: './documento-lote.component.html',
  styleUrls: ['./documento-lote.component.scss']
})
export class DocumentoLoteComponent implements OnInit {
  rowData: any;
  paginationState: any;
  displayedColumns: string[] = ['LoteId','DocumentoId', 'EstadoId', 'EstadoDescripcion', 'HojaId', 'CarillaId', 'Apellido','Nombre','NroDocumento','Legajo','actions']; 
  dataSource = new MatTableDataSource<any>();
  pageSizeOptions: number[] = [10, 25, 50];
  selectedPageSize = 10;
  totalRecords: number = 0;
  page = 1;
  pageSize = 10;
  resultDocumento: Documento | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, 
    private auditoriaService: AuditoriaService,
    public  loadingIndicatorService: LoadingIndicatorService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const state = history.state;
      this.rowData = state.rowData;
      this.paginationState = state.paginationState;
    });
    this.cargarResultados();
    
  }

  cargarResultados():void{
    this.loadingIndicatorService.showLoading();
    this.auditoriaService.getDocumentosLote(this.page, this.pageSize, this.rowData.LoteId)
      .subscribe(data => {
        this.dataSource.data = data.Data;
        this.totalRecords = this.dataSource.data[0]?.TotalRegistros;
        console.log(data.Data)
        this.loadingIndicatorService.hideLoading();
      });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.selectedPageSize = event.pageSize;
    this.cargarResultados();
  }

  onPageSizeChange(newPageSize: number): void {
    this.page = 1; 
    this.pageSize = newPageSize;
    this.cargarResultados();
  }

  getDocumento(row:any){
    this.auditoriaService.getDocumentoById(row.DocumentoId).subscribe((response: WebApiResponse) => {
      if (response.Data != null) {
        this.resultDocumento = response.Data;
        let dialogReg = this.dialog.open(DetailComponentComponent, {
          height: '98%',
          width: '98%',
          data: this.resultDocumento
        });

        console.log(this.resultDocumento);
      }
    });
  }

  volverAtras(): void {
    localStorage.setItem('paginationStateFromChild', JSON.stringify(this.paginationState));
    this.location.back();
  }
}
