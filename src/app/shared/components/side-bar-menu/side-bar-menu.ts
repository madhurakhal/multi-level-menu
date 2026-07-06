import { Component, model } from '@angular/core';
import { SidebarMenuFolder, SidebarMenuItem } from './interfaces/sidebar-menu.interface';
import { SideBarItem } from './components/side-bar-item/side-bar-item';
import { SideBarFolder } from './components/side-bar-folder/side-bar-folder';

@Component({
  selector: 'app-side-bar-menu',
  imports: [SideBarFolder, SideBarItem],
  templateUrl: './side-bar-menu.html',
  styleUrl: './side-bar-menu.scss',
})
export class SideBarMenuComponent {
  menus = model<(SidebarMenuFolder | SidebarMenuItem)[]>([]);

  handleFolderCheckedChange(folder: SidebarMenuFolder, isChecked: boolean) {
    console.log('Folder checked change:', folder.title, 'Checked:', isChecked);
    this.menus.update(menus => {
      return menus.map(menu => {
        if (menu.type === 'folder' && menu.id === folder.id) {
          return { ...menu, checked: isChecked };
        }
        return menu;
      });
    });
  }


  handleItemChanged(item: SidebarMenuItem, isChecked: boolean) {
    this.menus.update(menus => {
      return menus.map(menu => {
        if (menu.type === 'item' && menu.id === item.id) {
          return { ...menu, checked: isChecked };
        }
        return menu;
      });
    });
  }
}



export const sideBarMenu  = [SideBarMenuComponent,SideBarFolder, SideBarItem];