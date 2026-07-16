import { Component, contentChild, model, output, viewChild } from '@angular/core';
import { SideBarFolderItem } from './components/sidebar-folder-item/sidebar-folder-item';
import { SideBarListItem } from './components/sidebar-list-item/sidebar-list-item';
import { FolderTemplateDirective } from './directives/menu-folder-template.directive';
import { SidebarMenuFolder, SidebarMenuItem } from './interfaces/sidebar-menu.interface';
import { MenuItemTemplateDirective } from './directives/menu-item.template.directive';

@Component({
  selector: 'multi-level-side-menu',
  imports: [SideBarFolderItem, SideBarListItem],
  template: `<ul class="side-bar-folder-menu" role="tree">
    @for(item of menus(); track item.type + ':' + item.id) {
      @switch(item.type) {
        @case ('folder') {
          <li class="side-bar-folder-menu-folder">
              <sidebar-folder-item 
                [folder]="item" 
                (folderChange)="handleFolderUpdate($event)"
                [folderTemplate]="folderTemplate()?.templateRef"
                [itemTemplate]="menuItemTemplate()?.templateRef"
                (itemChanged)="handleItemChanged($event)"
                />
          </li>
        }
        @default {
          <li class="side-bar-folder-menu-item">
              <sidebar-list-item [item]="item" (itemChange)="handleItemChanged($event)"
               [itemTemplate]="menuItemTemplate()?.templateRef"
               />
          </li>
        }
      }
    }
</ul>`,
  styleUrl: './multi-level-menu.scss',
})
export class MultiLevelMenu {
  menuItemSelected = output<SidebarMenuItem>()
  menus = model<(SidebarMenuFolder | SidebarMenuItem)[]>([]);
  // sideBarTemplate = input<TemplateRef<SidebarFolderContext>>();

  folderTemplate = contentChild<FolderTemplateDirective>(FolderTemplateDirective);
  menuItemTemplate = contentChild<MenuItemTemplateDirective>(MenuItemTemplateDirective);

  handleFolderUpdate(folder: SidebarMenuFolder) {
    this.menus.update(menus => {
      return menus.map(i => i.id == folder.id ? folder : i)
    });
  }


  handleItemChanged(item: SidebarMenuItem) {
    if (item.checked) {
      this.menuItemSelected.emit(item)
    }
    this.menus.update(menus => {
      return menus.map(menu => {
        if (menu.type === 'item' && menu.id === item.id) {
          return { ...menu, checked: item.checked };
        }
        return menu;
      });
    });
  }
}
