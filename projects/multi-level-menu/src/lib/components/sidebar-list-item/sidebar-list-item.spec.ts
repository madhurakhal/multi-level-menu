import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarListItem } from './sidebar-list-item';

describe('SideBarListItem', () => {
  let component: SideBarListItem;
  let fixture: ComponentFixture<SideBarListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarListItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', {
      id: 1, title: 'Item', parent_id: null, type: 'item', checked: false,
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the checked state', () => {
    component.select(new Event('change'));

    expect(component.item().checked).toBe(true);
  });
});
