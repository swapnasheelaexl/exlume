import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAssumptionLibrary } from './master-assumption-library';

describe('MasterAssumptionLibrary', () => {
  let component: MasterAssumptionLibrary;
  let fixture: ComponentFixture<MasterAssumptionLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterAssumptionLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterAssumptionLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
