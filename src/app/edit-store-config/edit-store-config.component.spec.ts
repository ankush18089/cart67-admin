import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStoreConfigComponent } from './edit-store-config.component';

describe('EditStoreConfigComponent', () => {
  let component: EditStoreConfigComponent;
  let fixture: ComponentFixture<EditStoreConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStoreConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoreConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
