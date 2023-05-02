import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinAnimationComponent } from './coin-animations.component';

describe('CoinAnimationComponent', () => {
  let component: CoinAnimationComponent;
  let fixture: ComponentFixture<CoinAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoinAnimationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
