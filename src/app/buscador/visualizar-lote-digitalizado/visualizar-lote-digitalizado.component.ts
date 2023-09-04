import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuditoriaService } from 'src/app/shared/auditoria.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { LoadingIndicatorService } from 'src/app/shared/services/loading-indicator.service';

@Component({
  selector: 'app-visualizar-lote-digitalizado',
  templateUrl: './visualizar-lote-digitalizado.component.html',
  styleUrls: ['./visualizar-lote-digitalizado.component.scss']
})
export class VisualizarLoteDigitalizadoComponent implements OnInit {
  displayedColumns: string[] = ['Lote', 'Objeto', 'Fecha', 'Estado', 'EstadoDescripcion', 'UsuarioId', 'UsuarioNombre', 'UsuarioApellido', 'actions']; 
  dataSource = new MatTableDataSource<any>();
  pageSizeOptions: number[] = [10, 25, 50];
  selectedPageSize = 10;
  totalRecords: number = 0;
  page = 1;
  pageSize = 10;
  usuarios:any;
  usuarioSeleccionado: any;
  idUsuario=0;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private auditoriaService: AuditoriaService, private commonService:CommonService, public  loadingIndicatorService: LoadingIndicatorService,
    private router: Router) { }
  ngOnInit(): void {
    this.cargarResultados();
    this.cargarUsuarios();
  }

  cargarResultados(): void {
    this.loadingIndicatorService.showLoading();
    this.auditoriaService.getLotes(this.page, this.pageSize, this.idUsuario)
      .subscribe(data => {
        this.dataSource.data = data.Data; 
        this.totalRecords = this.dataSource.data[0]?.TotalRegistros;
        this.loadingIndicatorService.hideLoading();
        console.log(this.dataSource.data[0])
        console.log(this.dataSource.data[0]?.TotalRegistros)
        console.log(this.dataSource.data)
      });
  }

  cargarUsuarios():void {
    this.commonService.getUsuarios()
    .subscribe(result => {
      this.usuarios = result.Data; 
      console.log(this.usuarios)
    });
  }

  seleccionarUsuario(usuario: any) {
    this.idUsuario=this.usuarioSeleccionado;
    console.log(usuario)
    console.log(this.usuarioSeleccionado)
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1; // Page index is 0-based
    this.pageSize = event.pageSize;
    this.selectedPageSize = event.pageSize;
    this.cargarResultados();
    //this.loadData(nextPage, pageSize);
  }

  onPageSizeChange(newPageSize: number): void {
    this.page = 1; // Reiniciamos a la primera página
    this.pageSize = newPageSize;
    this.cargarResultados();
  }

  getDocumentos(row: any)
  {
    const navigationExtras = {
      state: {
        rowData: row
      }
    };
    this.router.navigate(['dashboard/auditoriaDocumento/documento-lote'], navigationExtras);
  }

  limpiar() {
   this.idUsuario=0;
   this.usuarioSeleccionado=null;
  }
  search() {
    this.page=1;
    this.cargarResultados();
  }
}
