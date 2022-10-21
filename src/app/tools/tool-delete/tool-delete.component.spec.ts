import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolDeleteComponent } from './tool-delete.component';

describe('ToolDeleteComponent', () => {
  let component: ToolDeleteComponent;
  let fixture: ComponentFixture<ToolDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
