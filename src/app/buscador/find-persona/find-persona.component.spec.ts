import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPersonaComponent } from './find-persona.component';

describe('FindPersonaComponent', () => {
  let component: FindPersonaComponent;
  let fixture: ComponentFixture<FindPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindPersonaComponent]
    });
    fixture = TestBed.createComponent(FindPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
