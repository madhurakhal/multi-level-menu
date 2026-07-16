import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, model, output, signal, TemplateRef } from '@angular/core';
import { SidebarMenuFolder, SidebarMenuItem } from '../../interfaces/sidebar-menu.interface';
import { SidebarFolderContext } from '../../interfaces/folder-template.context';
import { SideBarListItem } from '../sidebar-list-item/sidebar-list-item';
import { MenuItemContext } from '../../interfaces/menuitem-template.context';



@Component({
  selector: 'sidebar-folder-item',
  imports: [
    SideBarListItem,
    SideBarFolderItem,
    NgTemplateOutlet
  ],
  templateUrl: './sidebar-folder-item.html',
  styleUrl: './sidebar-folder-item.scss',
})
export class SideBarFolderItem {
  folderTemplate = input<TemplateRef<SidebarFolderContext>>();
  itemTemplate = input<TemplateRef<MenuItemContext>>();
  folder = model.required<SidebarMenuFolder>();
  itemChanged = output<SidebarMenuItem>();

  readonly hasTemplate = computed(() => !!this.folderTemplate());

  readonly menuItems = computed(() => this.folder().menuItems || []);
  readonly folders = computed(() => this.folder().folders || []);

  readonly isExpanded = signal(false);

  readonly hasMenuItems = computed(() => this.menuItems().length > 0);
  readonly hasFolders = computed(() => this.folders().length > 0);

  readonly hasMenuOrFolders = computed(() => this.hasMenuItems() || this.hasFolders());

  toggle() {
    this.isExpanded.set(!this.isExpanded());
  }

  toggleFolder(evt: Event) {
    evt.preventDefault();
    const newCheckedState = !this.folder().checked;

    this.folder.update(folder => this.updateFolderRecursive(folder, newCheckedState));
  }

  atLeastOneChecked = computed(() => {
    const menuItems = this.menuItems();
    const folders = this.folders();
    return menuItems.some(item => item.checked) || folders.some(folder => folder.checked);
  });

  handleFolderUpdate(updatedFolder: SidebarMenuFolder) {
    this.folder.update(folder => {
      const folders = folder.folders || [];
      const updatedFolders = folders.map(f =>
        f.id === updatedFolder.id ? updatedFolder : f
      );

      const menuItems = folder.menuItems || [];
      const allChecked = menuItems.every(item => item.checked) && updatedFolders.every(f => f.checked);

      return {
        ...folder,
        folders: updatedFolders,
        checked: allChecked,
      };
    });
  }

  handleItemChanged(item: SidebarMenuItem) {
    this.folder.update(folder => {
      const menuItems = folder.menuItems || [];
      const updatedMenuItems = menuItems.map(menuItem =>
        menuItem.id === item.id ? { ...menuItem, checked: !menuItem.checked } : menuItem
      );

      const folders = folder.folders || [];
      const allChecked = updatedMenuItems.every(item => item.checked) && folders.every(f => f.checked);

      return {
        ...folder,
        menuItems: updatedMenuItems,
        checked: allChecked,
      };
    });

    if (!item.checked) {
      this.itemChanged.emit(item);
    }
  }

  handleMenuItemChanged(item: SidebarMenuItem) {
    this.itemChanged.emit(item);
  }


  private updateFolderRecursive(
    folder: SidebarMenuFolder,
    checked: boolean,
  ): SidebarMenuFolder {
    return {
      ...folder,
      checked,
      menuItems: folder.menuItems?.map(item => ({
        ...item,
        checked,
      })),
      folders: folder.folders?.map(subFolder =>
        this.updateFolderRecursive(subFolder, checked)
      ),
    };
  }
}
