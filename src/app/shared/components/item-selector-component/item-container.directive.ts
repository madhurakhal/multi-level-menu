import { Directive, inject, TemplateRef } from "@angular/core";

export interface ItemContainerDirectiveContext {
    readonly $implicit: string;
    readonly isSelected: boolean;
    readonly onSelect: (color: string) => void;
}

@Directive({
    selector: '[appItemContainer]',
    exportAs: 'appItemContainer'
})
export class ItemContainerDirective {
    readonly template = inject(TemplateRef<ItemContainerDirectiveContext>);

    static ngTemplateContextGuard(_dir: ItemContainerDirective, ctx: any): ctx is ItemContainerDirectiveContext {
        return true;
    }
}