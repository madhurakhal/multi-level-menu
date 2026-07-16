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
    fixture.componentRef.setInput('folder', {
      id: 1,
      folder_id: 1,
      title: 'Folder',
      type: 'folder',
      checked: false,
      menuItems: [
        { id: 2, title: 'Child', parent_id: 1, type: 'item', checked: false },
      ],
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses the emitted item state and not an inverted value', () => {
    let selected = false;
    component.itemChanged.subscribe(item => selected = item.checked);

    component.handleItemChanged({ id: 2, title: 'Child', parent_id: 1, type: 'item', checked: true });

    expect(component.folder().menuItems?.[0].checked).toBe(true);
    expect(selected).toBe(true);
  });

  it('reports an indeterminate state for a partially selected deep folder', () => {
    fixture.componentRef.setInput('folder', {
      id: 1,
      folder_id: 1,
      title: 'Folder',
      type: 'folder',
      checked: false,
      folders: [{
        id: 2,
        folder_id: 2,
        title: 'Nested',
        type: 'folder',
        checked: false,
        menuItems: [
          { id: 3, title: 'Selected', parent_id: 2, type: 'item', checked: true },
          { id: 4, title: 'Not selected', parent_id: 2, type: 'item', checked: false },
        ],
      }],
    });

    expect(component.isIndeterminate()).toBe(true);
  });
});
