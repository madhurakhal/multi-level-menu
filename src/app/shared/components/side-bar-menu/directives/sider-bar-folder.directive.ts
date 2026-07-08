import { Directive, ElementRef, inject, TemplateRef } from "@angular/core";
import { SidebarMenuFolder } from "../interfaces/sidebar-menu.interface";


export interface SideBarFolderDirectiveContext {
    $implicit: SidebarMenuFolder
}

@Directive({
    selector: '[sideBarFolderTemplate]',
    host: {
        '(click)': 'onClick($event)'
    }
})
export class SideBarFolderDirective{
    readonly elementRef = inject(ElementRef<SideBarFolderDirectiveContext>);


    onClick(event: Event) {
        // this.sideBarFolder.toggleFolder(event);
    }

    static ngTemplateContextGuard(_elem: SideBarFolderDirective, context: unknown): context is  SideBarFolderDirectiveContext{
        return true;
    }

}