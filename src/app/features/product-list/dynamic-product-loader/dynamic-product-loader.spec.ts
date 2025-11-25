import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicProductLoader } from './dynamic-product-loader';

describe('DynamicProductLoader', () => {
  let component: DynamicProductLoader;
  let fixture: ComponentFixture<DynamicProductLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicProductLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicProductLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
