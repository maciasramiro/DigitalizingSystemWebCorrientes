import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { FindPersonaComponent } from './find-persona/find-persona.component';

const routes: Routes = [
  {path:'persona', component: FindPersonaComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class PersonaRoutingModule { }
