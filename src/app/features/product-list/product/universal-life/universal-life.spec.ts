import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalLife } from './universal-life';

describe('UniversalLife', () => {
  let component: UniversalLife;
  let fixture: ComponentFixture<UniversalLife>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversalLife]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversalLife);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
