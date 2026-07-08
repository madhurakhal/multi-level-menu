import { Component, computed, model, output } from '@angular/core';
import { SidebarMenuItem } from '../../interfaces/sidebar-menu.interface';

@Component({
  selector: 'app-side-bar-item',
  imports: [],
  templateUrl: './side-bar-item.html',
  styleUrl: './side-bar-item.scss',
})
export class SideBarItem {
  readonly item = model.required<SidebarMenuItem>();
  readonly itemChanged = output<boolean>();
  
  readonly title = computed(() => this.item().title);
  
  select(evt: Event) {
    evt.preventDefault();
    this.itemChanged.emit(!this.item().checked);
  }
}
