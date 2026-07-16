import { Directive, inject, TemplateRef } from "@angular/core";
import { MenuItemContext } from "../interfaces/menuitem-template.context";


@Directive({
    selector: '[multiLevelMenuItemTemplate]',
    exportAs: 'multiLevelMenuItemTemplate'
})
export class MenuItemTemplateDirective {
    readonly templateRef = inject(TemplateRef<MenuItemContext>);
    static ngTemplateContextGuard(_elem: MenuItemTemplateDirective, context: unknown): context is  MenuItemContext{
        return true;
    }   
}