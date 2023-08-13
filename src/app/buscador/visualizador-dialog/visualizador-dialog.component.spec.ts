import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorDialogComponent } from './visualizador-dialog.component';

describe('VisualizadorDialogComponent', () => {
  let component: VisualizadorDialogComponent;
  let fixture: ComponentFixture<VisualizadorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizadorDialogComponent]
    });
    fixture = TestBed.createComponent(VisualizadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
