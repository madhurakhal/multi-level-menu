import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChild, input, model, TemplateRef } from '@angular/core';
import { ItemTemplateDirective } from './item-template.directive';
import { ItemContainerDirective } from './item-container.directive';

@Component({
  selector: 'app-item-selector',
  imports: [NgTemplateOutlet],
  templateUrl: './item-selector-component.html',
  styleUrl: './item-selector-component.scss',
})
export class ItemSelectorComponent {
  readonly title = input.required<string>();
  readonly options = input.required<string[]>();
  selectedOption = model('');

  // readonly itemTemplate = input<TemplateRef<any>>();

  // readonly hasItemTemplate = computed(() => !!this.itemTemplate())


  // readonly itemContentChildTemplate = contentChild(TemplateRef<any>);


  // readonly hasItemChildTemplate = computed(() => this.itemContentChildTemplate());

  readonly itemTemplateDirective = contentChild(ItemTemplateDirective);
  readonly hasItemTemplate = computed(() => !!this.itemTemplateDirective());
  readonly itemTemplate = computed(() => this.itemTemplateDirective()?.template);


  readonly itemContainerDirective = contentChild(ItemContainerDirective);
  readonly hasItemContainerTemplate = computed(() => !!this.itemContainerDirective());
  readonly itemContainerTemplate = computed(() => this.itemContainerDirective()?.template);

  select(value: string) {
    this.selectedOption.set(value);
  }
}


export const ItemSelector = [ItemSelectorComponent, ItemTemplateDirective, ItemContainerDirective]