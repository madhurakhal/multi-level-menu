import { Component, signal } from '@angular/core';
// import { interval, map, mergeMap, of, take } from 'rxjs';
import { COLOR_NAMES, FONT_NAMES, SIZES } from './data/constants';
import { ItemSelector } from './shared/components/item-selector-component/item-selector-component';
import { SidebarMenuFolder, SidebarMenuItem } from './shared/components/side-bar-menu/interfaces/sidebar-menu.interface';
import { sideBarMenu } from './shared/components/side-bar-menu/side-bar-menu';

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
      title: 'Our company',
      foldder_id: 1,
      type: 'folder',
      checked: false,
      menuItems: [
        { id: 1, title: 'Contact us', parent_id: 1, type: 'item', checked: false },
        { id: 2, title: 'Locations', parent_id: 1, type: 'item', checked: false },
      ],
      folders: [
        {
          id: 3, title: 'Our teams', foldder_id: 1, type: 'folder', checked: false,
          folders: [
            {
              id: 4, title: 'Directors', foldder_id: 3, type: 'folder',
              checked: false,
              menuItems: [
                { id: 4, title: 'Management', parent_id: 4, type: 'item', checked: false},
              ]
            }
          ],
          menuItems: [
            { id: 3, title: 'Services', parent_id: 3, type: 'item' , checked:false},
          ]
        },
      ]
    },
    {
      id: 2,
      title: 'About Us',
      foldder_id: 2,
      type: 'folder',
      checked: false,
      menuItems: [
        { id: 5, title: 'Advisory team', parent_id: 2, type: 'item', checked: false },
        { id: 6, title: 'Investors', parent_id: 2, type: 'item', checked: false },
      ],
    }
  ]);



  constructor() {
    // of(1, 2, 3)
    //   .pipe(
    //     mergeMap(val => {
    //       return interval(1000)
    //         .pipe(
    //           take(3),
    //           map(index => `Value of ${val} - ${index}`)
    //         )
    //     })
    //   ).subscribe(
    //     console.log
    //   );


    // 
  }
}
