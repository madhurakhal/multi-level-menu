import { Component, computed, effect, input, model, output, signal } from '@angular/core';
import { SidebarMenuFolder, SidebarMenuItem } from '../../interfaces/sidebar-menu.interface';
import { SideBarItem } from '../side-bar-item/side-bar-item';

@Component({
  selector: 'app-side-bar-folder',
  imports: [
    SideBarItem,
  ],
  templateUrl: './side-bar-folder.html',
  styleUrl: './side-bar-folder.scss',
})
export class SideBarFolder {
  topLevel = input<boolean>(true);
  folder = model.required<SidebarMenuFolder>();

  folderCheckedChanged = output<boolean>();

  readonly menuItems = computed(() => this.folder().menuItems || []);
  readonly folders = computed(() => this.folder().folders || []);

  readonly isExpanded = signal(false);

  hasMenuItems = computed(() => this.menuItems().length > 0);
  hasFolders = computed(() => this.folders().length > 0);

  hasMenuOrFolders = computed(() => this.hasMenuItems() || this.hasFolders());

  toggle() {
    this.isExpanded.set(!this.isExpanded());
  }

  _handleCheck(evt: Event) {
    const checkbox = evt.target as HTMLInputElement;
    this.folder.update(folder => {
      return {
        ...folder,
        checked: checkbox.checked,
      };
    });
    this.updateChildren();

    if (!this.topLevel()) {
      this.folderCheckedChanged.emit(checkbox.checked);

    }
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
      if (!this.topLevel()) {
        console.log('Emitting folder checked change for folder:', this.folder().title, 'Checked:', checked);
        this.folderCheckedChanged.emit(checked);
      }


    })
  }

  handleFolderCheckedChange(item: SidebarMenuFolder, isChecked: boolean) {
    console.log('initial', item, isChecked);

    
    this.folder.update(folder => {
        return {
          ...folder,
          checked: isChecked
        }
      });

    if (!this.topLevel()) {
      console.log('Emitting folder checked change for folder:', item.title, 'Checked:', isChecked);
      this.folderCheckedChanged.emit(isChecked);
    }
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
  }



  private updateChildren() {
    const newCheckedState = this.folder().checked;
    this.folder.update(folder =>  {
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
