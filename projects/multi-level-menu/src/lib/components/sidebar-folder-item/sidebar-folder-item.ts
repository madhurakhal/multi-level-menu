import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, input, model, output, signal, TemplateRef } from '@angular/core';
import { SidebarMenuFolder, SidebarMenuItem } from '../../interfaces/sidebar-menu.interface';
import { SidebarFolderContext } from '../../interfaces/sidebar-folder.context';
import { SideBarListItem } from '../sidebar-list-item/sidebar-list-item';



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
  sideBarFolderTemplate = input<TemplateRef<SidebarFolderContext>>();
  folder = model.required<SidebarMenuFolder>();
  folderUpdated = output<SidebarMenuFolder>();


  readonly hasTemplate = computed(() => !!this.sideBarFolderTemplate());

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

    this.folder.update(folder => {
      return {
        ...folder,
        checked: !folder.checked,
      };
    });
    this.updateChildren();
    this.folderUpdated.emit(this.folder())
  }

  atLeastOneChecked = computed(() => {
    const menuItems = this.menuItems();
    const folders = this.folders();
    return menuItems.some(item => item.checked) || folders.some(folder => folder.checked);
  });

  allChecked = computed(() => {
    const menuItems = this.menuItems();
    const folders = this.folders();
    return menuItems.every(item => item.checked) && folders.every(folder => folder.checked);
  });

  constructor() {
    effect(() => {
      const checked = this.allChecked();
      this.folder.update(folder => {
        return {
          ...folder,
          checked
        }
      });
      this.folderUpdated.emit(this.folder())
    })
  }

  handleFolderUpdate(updatedFolder: SidebarMenuFolder) {
    if (this.folder().folders?.length) {
      this.folder.update(folder => {
        return {
          ...folder,
          folders: folder.folders?.map(f =>
            f.id === updatedFolder.id ? updatedFolder : f
          )
        }
      })
    }
    this.folderUpdated.emit(this.folder())
  }

  handleItemChanged(item: SidebarMenuItem, isChecked: boolean) {
    this.folder.update(folder => {
      const menuItems = folder.menuItems || [];

      const updatedMenuItems = menuItems.map(menuItem => {
        if (menuItem.id === item.id) {
          return { ...menuItem, checked: isChecked };
        }
        return menuItem;
      });
      return {
        ...folder,
        menuItems: updatedMenuItems,
      };
    });

    this.folderUpdated.emit(this.folder())
  }



  private updateChildren() {
    const newCheckedState = this.folder().checked;
    this.folder.update(folder => {
      return {
        ...folder,
        menuItems: folder.menuItems?.map(item => ({
          ...item,
          checked: newCheckedState,
        })),
        checked: newCheckedState,
        folders: folder.folders?.map(subfolder => this.updateFolderRecursive(subfolder, newCheckedState))
      }
    });
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
