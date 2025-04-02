import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerroUpdateComponent } from './perro-update.component';

describe('PerroUpdateComponent', () => {
  let component: PerroUpdateComponent;
  let fixture: ComponentFixture<PerroUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerroUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerroUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
