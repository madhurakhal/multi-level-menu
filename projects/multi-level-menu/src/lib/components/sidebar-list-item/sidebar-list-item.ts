import { Component, computed, input, model, output, TemplateRef } from '@angular/core';
import { SidebarMenuItem } from '../../interfaces/sidebar-menu.interface';
import { NgTemplateOutlet } from '@angular/common';
import { MenuItemContext } from '../../interfaces/menuitem-template.context';

@Component({
  selector: 'sidebar-list-item',
  imports: [NgTemplateOutlet],
  templateUrl: './sidebar-list-item.html',
  styleUrl: './sidebar-list-item.scss',
})
export class SideBarListItem {
  readonly item = model.required<SidebarMenuItem>();
  readonly title = computed(() => this.item().title);

  itemTemplate = input<TemplateRef<MenuItemContext>>();


  hasTemplate = computed(() => !!this.itemTemplate());

  select(evt: Event) {
    evt.preventDefault();
    this.item.update(item => ({ ...item, checked: !item.checked }));
  }
}
