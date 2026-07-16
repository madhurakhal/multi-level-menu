import { FolderTemplateDirective } from "./lib/directives/menu-folder-template.directive";
import { MenuItemTemplateDirective } from "./lib/directives/menu-item.template.directive";
import { MultiLevelMenu } from "./lib/multi-level-menu";

/*
 * Public API Surface of multi-level-menu
 */
export { MultiLevelMenu, FolderTemplateDirective , MenuItemTemplateDirective } 
export type { SidebarMenuFolder, SidebarMenuItem } from "./lib/interfaces/sidebar-menu.interface";
export type { SidebarFolderContext } from "./lib/interfaces/folder-template.context";
