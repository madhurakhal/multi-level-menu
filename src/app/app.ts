import { Component, signal } from '@angular/core';
import { interval, map, mergeMap, of, take } from 'rxjs';
import { ItemSelector } from './shared/components/item-selector-component/item-selector-component';
import { COLOR_NAMES, FONT_NAMES, SIZES } from './data/constants';
import { sideBarMenu } from './shared/components/side-bar-menu/side-bar-menu';
import { SidebarMenuFolder, SidebarMenuItem } from './shared/components/side-bar-menu/interfaces/sidebar-menu.interface';

@Component({
  selector: 'app-root',
  imports: [ItemSelector, sideBarMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-list');
  readonly possibleColors = signal(COLOR_NAMES);
  readonly possibleFonts = signal(FONT_NAMES);
  readonly possibleSizes = signal(SIZES);

  readonly selectedColor = signal(this.possibleColors()[0]);
  readonly selectedFont = signal(this.possibleFonts()[0]);
  readonly selectedSize = signal(this.possibleSizes()[0]);


get menus(): (SidebarMenuFolder | SidebarMenuItem)[] {
  return this.menusSignal();
}
set menus(value: (SidebarMenuFolder | SidebarMenuItem)[]) {
  this.menusSignal.set(value);
}

  menusSignal = signal<(SidebarMenuFolder | SidebarMenuItem)[]>([
    {
      id: 1,
      title: 'Folder 1',
      foldder_id: 1,
      type: 'folder',
      checked: false,
      menuItems: [
        { id: 1, title: 'Item 1', parent_id: 1, type: 'item', checked: false },
        { id: 2, title: 'Item 2', parent_id: 1, type: 'item', checked: false },
      ],
      folders: [
        {
          id: 3, title: 'Folder 3', foldder_id: 1, type: 'folder', checked: false,
          folders: [
            {
              id: 4, title: 'Folder 4', foldder_id: 3, type: 'folder',
              checked: false,
              menuItems: [
                { id: 4, title: 'Item 4', parent_id: 4, type: 'item', checked: false},
              ]
            }
          ],
          menuItems: [
            { id: 3, title: 'Item 3', parent_id: 3, type: 'item' , checked:false},
          ]
        },
      ]
    },
    {
      id: 2,
      title: 'Folder 2',
      foldder_id: 2,
      type: 'folder',
      checked: false,
      menuItems: [
        { id: 5, title: 'Item 5', parent_id: 2, type: 'item', checked: false },
        { id: 6, title: 'Item 6', parent_id: 2, type: 'item', checked: false },
      ],
    }
  ]);



  constructor() {
    of(1, 2, 3)
      .pipe(
        mergeMap(val => {
          return interval(1000)
            .pipe(
              take(3),
              map(index => `Value of ${val} - ${index}`)
            )
        })
      ).subscribe(
        console.log
      );


    // 
  }
}
