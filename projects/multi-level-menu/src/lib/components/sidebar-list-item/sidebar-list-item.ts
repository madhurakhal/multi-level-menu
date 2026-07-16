import { Component, computed, model, output } from '@angular/core';
import { SidebarMenuItem } from '../../interfaces/sidebar-menu.interface';

@Component({
  selector: 'sidebar-list-item',
  imports: [],
  templateUrl: './sidebar-list-item.html',
  styleUrl: './sidebar-list-item.scss',
})
export class SideBarListItem {
  readonly item = model.required<SidebarMenuItem>();
  readonly itemChanged = output<boolean>();

  readonly title = computed(() => this.item().title);

  select(evt: Event) {
    evt.preventDefault();
    this.itemChanged.emit(!this.item().checked);
  }
}
