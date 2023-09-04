import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoLoteComponent } from './documento-lote.component';

describe('DocumentoLoteComponent', () => {
  let component: DocumentoLoteComponent;
  let fixture: ComponentFixture<DocumentoLoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentoLoteComponent]
    });
    fixture = TestBed.createComponent(DocumentoLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
