import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLevelMenu } from './multi-level-menu';

describe('MultiLevelMenu', () => {
  let component: MultiLevelMenu;
  let fixture: ComponentFixture<MultiLevelMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLevelMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiLevelMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preserves a top-level item checked state and emits selection', () => {
    component.menus.set([
      { id: 1, title: 'Item', parent_id: null, type: 'item', checked: false },
    ]);
    let selected = false;
    component.menuItemSelected.subscribe(item => selected = item.checked);

    component.handleItemChanged({ id: 1, title: 'Item', parent_id: null, type: 'item', checked: true });

    expect(component.menus()[0].checked).toBe(true);
    expect(selected).toBe(true);
  });
});
