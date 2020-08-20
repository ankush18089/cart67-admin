import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMessageComponent } from './store-message.component';

describe('StoreMessageComponent', () => {
  let component: StoreMessageComponent;
  let fixture: ComponentFixture<StoreMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
