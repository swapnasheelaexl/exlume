import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableUniversalLife } from './variable-universal-life';

describe('VariableUniversalLife', () => {
  let component: VariableUniversalLife;
  let fixture: ComponentFixture<VariableUniversalLife>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableUniversalLife]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariableUniversalLife);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
