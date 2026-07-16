import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarFolderItem } from './sidebar-folder-item';

describe('SideBarFolder', () => {
  let component: SideBarFolderItem;
  let fixture: ComponentFixture<SideBarFolderItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarFolderItem],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarFolderItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
