import { SidebarMenuItem } from "./sidebar-menu.interface";


export interface MenuItemContext {
    $implicit: SidebarMenuItem;
    isChecked: boolean;
    select: (evt: Event) => void;
}