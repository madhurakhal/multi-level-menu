import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarFolder } from './side-bar-folder';

describe('SideBarFolder', () => {
  let component: SideBarFolder;
  let fixture: ComponentFixture<SideBarFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarFolder],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarFolder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
