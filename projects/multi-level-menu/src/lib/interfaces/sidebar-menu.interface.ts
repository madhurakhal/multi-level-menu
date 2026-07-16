export type MenuType = 'folder' | 'item';

export type SidebarMenuItem = {
    id: number;
    title: string;
    parent_id: number | null;
    type: 'item';
    checked: boolean;
}

export type SidebarMenuFolder = Omit<SidebarMenuItem, 'parent_id' | 'type'> & {
    folder_id: number;
    menuItems?: SidebarMenuItem[];
    folders?: SidebarMenuFolder[];
    type: 'folder';
}

