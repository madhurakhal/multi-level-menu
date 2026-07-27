import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFileManager } from './ngx-file-manager';

describe('NgxFileManager', () => {
  let component: NgxFileManager;
  let fixture: ComponentFixture<NgxFileManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFileManager],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxFileManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
