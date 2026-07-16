# MultiLevelMenu

A highly customizable, tree-structured sidebar navigation menu for Angular applications. It supports nested folders and items, tri-state checkbox state propagation (select children, update parent status), smooth expand/collapse triggers, and custom template rendering.

## Installation

```bash
npm install multi-level-menu
```

Make sure you import **Material Symbols** in your `index.html` (or equivalent global styles) for default folder/file icons:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
```

---

## Getting Started

### 1. Define Your Menu Data
Create a nested structure using `SidebarMenuFolder` and `SidebarMenuItem` types:

```typescript
import { type SidebarMenuFolder, type SidebarMenuItem } from 'multi-level-menu';

const menus: (SidebarMenuFolder | SidebarMenuItem)[] = [
  {
    id: 1,
    title: 'Our Company',
    folder_id: 1,
    type: 'folder',
    checked: false,
    menuItems: [
      { id: 1, title: 'Contact Us', parent_id: 1, type: 'item', checked: false },
      { id: 2, title: 'Locations', parent_id: 1, type: 'item', checked: false },
    ],
    folders: [
      {
        id: 3,
        title: 'Development Teams',
        folder_id: 3,
        type: 'folder',
        checked: false,
        menuItems: [
          { id: 3, title: 'Engineering', parent_id: 3, type: 'item', checked: false },
        ]
      }
    ]
  }
];
```

### 2. Import MultiLevelMenu
Import `MultiLevelMenu` in your standalone component's `imports` array:

```typescript
import { Component, signal } from '@angular/core';
import {
  MultiLevelMenu,
  FolderTemplateDirective,
  MenuItemTemplateDirective,
  type SidebarMenuFolder,
  type SidebarMenuItem,
} from 'multi-level-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MultiLevelMenu, FolderTemplateDirective, MenuItemTemplateDirective],
  templateUrl: './app.html'
})
export class App {
  menus = signal<(SidebarMenuFolder | SidebarMenuItem)[]>(/* your data */);

  handleSelectMenu(item: SidebarMenuItem) {
    console.log('Selected menu item:', item);
  }
}
```

### 3. Place the Component in your Template
```html
<multi-level-side-menu 
  [(menus)]="menus" 
  (menuItemSelected)="handleSelectMenu($event)">
</multi-level-side-menu>
```

---

## Customizing CSS / Theming

The default styles utilize CSS custom properties (variables), allowing you to customize colors, spacing, and sizing easily from your global style sheet or parent component:

```css
/* Style override in your app's stylesheet */
multi-level-side-menu {
  --menu-accent-color: #4f46e5;          /* Indigo accent */
  --menu-hover-bg: #f8fafc;              /* Slate-50 hover */
  --menu-font-size: 13px;                /* Compact font sizes */
  --menu-folder-icon-color: #d97706;     /* Amber folders */
  --menu-file-icon-color: #3b82f6;       /* Blue files */
  --menu-tree-line-color: #cbd5e1;       /* Tree connection lines */
}
```

### Available Custom CSS Properties

| CSS Custom Property | Default Value | Description |
|---|---|---|
| `--menu-text-color` | `#334155` | General text color of the menu |
| `--menu-bg-color` | `#ffffff` | Background color of the menu container |
| `--menu-border-color` | `#e2e8f0` | Border color (if enabled) |
| `--menu-border-radius` | `12px` | Border radius of the menu container |
| `--menu-max-width` | `320px` | Max width of the menu container |
| `--menu-item-border-radius` | `6px` | Border radius of items on hover |
| `--menu-accent-color` | `#6366f1` | Color used for checkboxes |
| `--menu-hover-bg` | `#f1f5f9` | Background highlight on hover |
| `--menu-file-icon-color` | `#64748b` | Color of document file icons |
| `--menu-folder-icon-color` | `#eab308` | Color of folder icons |
| `--menu-folder-text-color` | `#1e293b` | Text color for folder names |
| `--menu-item-text-color` | `#334155` | Text color for file names |
| `--menu-expand-arrow-color` | `#94a3b8` | Color of the expand/collapse arrow |
| `--menu-tree-line-color` | `#e2e8f0` | Color of hierarchical branch lines |
| `--menu-transition-speed` | `0.15s` | Speed of hover and collapse animations |

---

## Customizing Templates

If the default layout does not match your design requirements, project an `ng-template` marked with `multiLevelFolderTemplate` or `multiLevelMenuItemTemplate`. Import the corresponding directives in the standalone component that declares the template.

### Template Context Contract
The custom template receives a context object of type `SidebarFolderContext`:

| Property | Type | Description |
|---|---|---|
| `$implicit` | `SidebarMenuFolder` | The current folder data object |
| `toggle` | `() => void` | Function to collapse or expand the folder |
| `isExpanded` | `boolean` | Flag indicating if the folder is currently expanded |
| `toggleFolder` | `(evt: Event) => void` | Toggles the checkbox selection of the folder and all its children |
| `atLeastOneChecked` | `() => boolean` | Returns true if at least one descendant is checked (tri-state check) |

### Custom Template Example

Define your custom folder template in the parent template:

```html
<!-- app.component.html -->
<ng-template multiLevelFolderTemplate
  let-folder 
  let-toggle="toggle" 
  let-isExpanded="isExpanded" 
  let-toggleFolder="toggleFolder" 
  let-atLeastOneChecked="atLeastOneChecked">
  
  <div class="custom-folder-row">
    <!-- Tri-state checkbox representation -->
    @if (folder.checked) {
      <input type="checkbox" [checked]="true" (change)="toggleFolder($event)" />
    } @else if (atLeastOneChecked()) {
      <span class="custom-indeterminate-checkbox" (click)="toggleFolder($event)">[-]</span>
    } @else {
      <input type="checkbox" [checked]="false" (change)="toggleFolder($event)" />
    }

    <!-- Clickable title to toggle collapse state -->
    <span class="custom-folder-title" (click)="toggle()">
      {{ folder.title }}
    </span>

    <!-- Expand/collapse arrow indicator -->
    <button class="expand-toggle-btn" (click)="toggle()">
      {{ isExpanded ? 'Collapse' : 'Expand' }}
    </button>
  </div>
</ng-template>

<multi-level-side-menu [(menus)]="menus">
</multi-level-side-menu>
```

---

## API Reference

### `<multi-level-side-menu>`

#### Inputs & Outputs
* **`[(menus)]`** (`model<(SidebarMenuFolder | SidebarMenuItem)[]>`): Two-way model binding representing the menu configuration structure.
* **`multiLevelFolderTemplate`**: Optional projected template directive used to customize folder rendering.
* **`multiLevelMenuItemTemplate`**: Optional projected template directive used to customize item rendering.
* **`(menuItemSelected)`** (`output<SidebarMenuItem>`): Event emitted whenever an individual menu item is selected (checked is set to `true`).
