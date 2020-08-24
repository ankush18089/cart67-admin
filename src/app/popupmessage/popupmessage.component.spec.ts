import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupmessageComponent } from './popupmessage.component';

describe('PopupmessageComponent', () => {
  let component: PopupmessageComponent;
  let fixture: ComponentFixture<PopupmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
