import { Component, input, model, output, TemplateRef } from '@angular/core';
import { SideBarFolderItem } from './components/sidebar-folder-item/sidebar-folder-item';
import { SideBarListItem } from './components/sidebar-list-item/sidebar-list-item';
import { SidebarMenuFolder, SidebarMenuItem } from './interfaces/sidebar-menu.interface';
import { SidebarFolderContext } from './interfaces/sidebar-folder.context';

@Component({
  selector: 'multi-level-side-menu',
  imports: [SideBarFolderItem, SideBarListItem],
  template: ` <ul class="side-bar-folder-menu">
    @for(item of menus(); track item.id) {
    @switch(item.type) {
    @case ('folder') {
    <li class="side-bar-folder-menu-folder">
        <sidebar-folder-item [folder]="item" (folderUpdated)="handleFolderUpdate($event)"
        [sideBarFolderTemplate]="sideBarTemplate()"
        (itemSelected)="handleItemChangedInFolder($event)"
        >
        </sidebar-folder-item>
    </li>
    }
    @default {
    <li class="side-bar-folder-menu-item">
        <sidebar-list-item [item]="item" (itemSelected)="handleItemChanged(item, $event)">
        </sidebar-list-item>
    </li>
    }
    }
    }
</ul>`,
  styleUrl: './multi-level-menu.scss',
})
export class MultiLevelMenu {
  menuSelected = output<SidebarMenuItem>()
  menus = model<(SidebarMenuFolder | SidebarMenuItem)[]>([]);
  sideBarTemplate = input<TemplateRef<SidebarFolderContext>>();


  handleFolderUpdate(folder: SidebarMenuFolder) {
    this.menus.update(menus => {
      return menus.map(i => i.id == folder.id ? folder : i)
    });
  }


  handleItemChanged(item: SidebarMenuItem, isChecked: boolean) {
    debugger
    if (isChecked) {
      this.menuSelected.emit(item)
    }
    this.menus.update(menus => {
      return menus.map(menu => {
        if (menu.type === 'item' && menu.id === item.id) {
          return { ...menu, checked: isChecked };
        }
        return menu;
      });
    });
  }

  handleItemChangedInFolder(item: SidebarMenuItem) {
    this.menuSelected.emit(item)
  }
}
