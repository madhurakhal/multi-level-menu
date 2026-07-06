import { Component, computed, model, output } from '@angular/core';
import { SidebarMenuItem } from '../../interfaces/sidebar-menu.interface';

@Component({
  selector: 'app-side-bar-item',
  imports: [],
  templateUrl: './side-bar-item.html',
  styleUrl: './side-bar-item.scss',
})
export class SideBarItem {
  item = model.required<SidebarMenuItem>();
  itemChanged = output<boolean>();

  readonly title = computed(() => this.item().title);

  select(evt: Event) {
    const checkbox = evt.target as HTMLInputElement;
    this.itemChanged.emit(checkbox.checked);
  }
}
