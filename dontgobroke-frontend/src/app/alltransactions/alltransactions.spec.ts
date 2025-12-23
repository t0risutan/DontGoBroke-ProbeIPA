import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alltransactions } from './alltransactions';

describe('Alltransactions', () => {
  let component: Alltransactions;
  let fixture: ComponentFixture<Alltransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alltransactions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Alltransactions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
