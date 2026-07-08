import { SidebarMenuFolder } from "./sidebar-menu.interface";

export interface SidebarFolderContext {
    $implicit: SidebarMenuFolder;
    toggle: () => void;
    isExpanded: boolean;
    toggleFolder: (evt: Event) => void,
    atLeastOneChecked: () => boolean
}