import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarLoteDigitalizadoComponent } from './visualizar-lote-digitalizado.component';

describe('VisualizarLoteDigitalizadoComponent', () => {
  let component: VisualizarLoteDigitalizadoComponent;
  let fixture: ComponentFixture<VisualizarLoteDigitalizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarLoteDigitalizadoComponent]
    });
    fixture = TestBed.createComponent(VisualizarLoteDigitalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
