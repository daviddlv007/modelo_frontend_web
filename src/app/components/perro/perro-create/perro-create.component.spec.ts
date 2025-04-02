import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerroCreateComponent } from './perro-create.component';

describe('PerroCreateComponent', () => {
  let component: PerroCreateComponent;
  let fixture: ComponentFixture<PerroCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerroCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
