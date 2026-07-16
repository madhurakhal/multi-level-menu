import { Directive, inject, TemplateRef } from "@angular/core";
import { SidebarFolderContext } from "../interfaces/folder-template.context";

@Directive({
    selector: '[multiLevelFolderTemplate]',
    exportAs: 'multiLevelFolderTemplate'
})
export class FolderTemplateDirective {
    readonly templateRef = inject(TemplateRef<SidebarFolderContext>);
    static ngTemplateContextGuard(_elem: FolderTemplateDirective, context: unknown): context is  SidebarFolderContext{
        return true;
    }

}