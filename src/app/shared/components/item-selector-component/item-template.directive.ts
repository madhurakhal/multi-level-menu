import { Directive, inject, TemplateRef } from "@angular/core";

export interface ItemTemplateDirectiveContext {
   readonly $implicit: string;
   readonly selected: boolean;
}


@Directive({
    selector: '[appItemTemplate]',
    exportAs: 'appItemTemplate'
})
export class ItemTemplateDirective {
    readonly template = inject(TemplateRef<ItemTemplateDirectiveContext>);

    static ngTemplateContextGuard(_dir: ItemTemplateDirective, ctx: any): ctx is ItemTemplateDirectiveContext {
        return true;
    }
}