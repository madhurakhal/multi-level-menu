import { FolderTemplateDirective } from "./lib/directives/menu-folder-template.directive";
import { MenuItemTemplateDirective } from "./lib/directives/menu-item.template.directive";
import { MultiLevelMenu } from "./lib/multi-level-menu";

/*
 * Public API Surface of @madhurakhalmagar/ngx-folder-tree
 */
export { MultiLevelMenu, FolderTemplateDirective , MenuItemTemplateDirective } 
export type { SidebarMenuFolder, SidebarMenuItem } from "./lib/interfaces/sidebar-menu.interface";
export type { SidebarFolderContext } from "./lib/interfaces/folder-template.context";
export type { MenuItemContext } from "./lib/interfaces/menuitem-template.context";
