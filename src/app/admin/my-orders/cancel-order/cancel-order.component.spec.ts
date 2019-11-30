import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderComponent } from './cancel-order.component';
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule, MatSelectModule, MatIconModule, MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CancelOrderComponent', () => {
  let component: CancelOrderComponent;
  let fixture: ComponentFixture<CancelOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelOrderComponent ],
      imports: [ MatStepperModule, MatFormFieldModule,
      FormsModule, ReactiveFormsModule, MatSelectModule, MatIconModule, MatCardModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
