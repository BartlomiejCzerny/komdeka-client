import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolAddComponent } from './tool-add.component';

describe('ToolAddComponent', () => {
  let component: ToolAddComponent;
  let fixture: ComponentFixture<ToolAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
