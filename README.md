# Angular Multi-Level Menu

An Angular workspace containing the `multi-level-menu` library and a small demo application. The library renders nested folders and selectable menu items, supports custom folder/item templates, and maintains checked state through the tree.

## Workspace layout

- `projects/multi-level-menu` — publishable Angular library.
- `src/app` — demo application for developing and verifying the library.

The complete consumer-facing API and theming guide are in the [library README](projects/multi-level-menu/README.md).

## Run the demo

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Use the library locally

Build the package with:

```bash
npm run ng -- build multi-level-menu --configuration production
```

The generated package is written to `dist/multi-level-menu`.

In a standalone Angular component, import the menu and optional template directives:

```ts
import {
  MultiLevelMenu,
  FolderTemplateDirective,
  MenuItemTemplateDirective,
} from 'multi-level-menu';

@Component({
  imports: [MultiLevelMenu, FolderTemplateDirective, MenuItemTemplateDirective],
})
export class App {}
```

```html
<multi-level-side-menu
  [(menus)]="menus"
  (menuItemSelected)="handleSelectMenu($event)">
</multi-level-side-menu>
```

## Quality checks

```bash
# Demo application
npm run build
npm test

# Library
npm run ng -- build multi-level-menu --configuration production
npm run ng -- test multi-level-menu --watch=false
```

## Notes

The default icons use Material Symbols. Add the Material Symbols stylesheet to the consuming application, or provide custom templates using `multiLevelFolderTemplate` and `multiLevelMenuItemTemplate`.
