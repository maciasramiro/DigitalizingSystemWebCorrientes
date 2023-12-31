import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindPersonaComponent } from './find-persona/find-persona.component';
import { PersonaRoutingModule } from './persona-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { VisualizadorDialogComponent } from './visualizador-dialog/visualizador-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { VisualizarLoteDigitalizadoComponent } from './visualizar-lote-digitalizado/visualizar-lote-digitalizado.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DocumentoLoteComponent } from './documento-lote/documento-lote.component';
import { DetailComponentComponent } from './detail-component/detail-component.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { PersonaComponent } from './persona/persona.component';


@NgModule({
  declarations: [
    FindPersonaComponent,
    VisualizadorDialogComponent,
    VisualizarLoteDigitalizadoComponent,
    DocumentoLoteComponent,
    DetailComponentComponent,
    LoadingIndicatorComponent,
    PersonaComponent
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  exports:[
    MatPaginatorModule
  ],
  bootstrap: [VisualizarLoteDigitalizadoComponent]
})
export class PersonaModule { }
