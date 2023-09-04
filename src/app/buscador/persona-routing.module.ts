import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { FindPersonaComponent } from './find-persona/find-persona.component';
import { VisualizarLoteDigitalizadoComponent } from './visualizar-lote-digitalizado/visualizar-lote-digitalizado.component';
import { DocumentoLoteComponent } from './documento-lote/documento-lote.component';

const routes: Routes = [
  {path:'persona', component: FindPersonaComponent  },
  { path: 'auditoriaLote', component: VisualizarLoteDigitalizadoComponent},
  { path: 'documento-lote', component: DocumentoLoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class PersonaRoutingModule { }
