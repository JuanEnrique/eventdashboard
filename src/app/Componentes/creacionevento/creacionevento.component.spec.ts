import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacioneventoComponent } from './creacionevento.component';

describe('CreacioneventoComponent', () => {
  let component: CreacioneventoComponent;
  let fixture: ComponentFixture<CreacioneventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacioneventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreacioneventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
