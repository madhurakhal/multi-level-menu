import { Component, input, model, TemplateRef } from '@angular/core';
import { SideBarFolder } from './components/side-bar-folder/side-bar-folder';
import { SideBarItem } from './components/side-bar-item/side-bar-item';
import { SideBarFolderDirective } from './directives/sider-bar-folder.directive';
import { SidebarMenuFolder, SidebarMenuItem } from './interfaces/sidebar-menu.interface';
import { SidebarFolderContext } from './interfaces/sidebar-folder.context';

@Component({
  selector: 'app-side-bar-menu',
  imports: [SideBarFolder, SideBarItem, SideBarFolderDirective],
  templateUrl: './side-bar-menu.html',
  styleUrl: './side-bar-menu.scss',
})
export class SideBarMenuComponent {
  menus = model<(SidebarMenuFolder | SidebarMenuItem)[]>([]);

  sideBarTemplate = input<TemplateRef<SidebarFolderContext>>();


  handleFolderUpdate(folder: SidebarMenuFolder) {
    this.menus.update(menus => {
      return menus.map(i => i.id == folder.id ? folder: i)
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



export const sideBarMenu  = [SideBarMenuComponent,SideBarFolder, SideBarItem, SideBarFolderDirective];