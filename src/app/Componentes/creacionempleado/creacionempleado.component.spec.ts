import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionempleadoComponent } from './creacionempleado.component';

describe('CreacionempleadoComponent', () => {
  let component: CreacionempleadoComponent;
  let fixture: ComponentFixture<CreacionempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionempleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreacionempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
