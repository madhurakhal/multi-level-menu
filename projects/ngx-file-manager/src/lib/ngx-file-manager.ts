import { Component, input } from '@angular/core';

@Component({
  selector: 'ngx-file-manager',
  imports: [],
  template: `
    <div class="ngx-file-manager-wrapper">
      <div class="ngx-file-manager-sidebar">
      </div>

      <div class="ngx-file-manager-container">
        
      </div>
    </div>
  `,
  styles: ``,
})
export class NgxFileManager {
  canuploadFile = input(true);
  allowToChangeView = input(true);


}
