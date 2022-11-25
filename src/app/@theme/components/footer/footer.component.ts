import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Criado por <b><a href="https://www.facebook.com/NadirPresentes/" target="_blank">Nadir Presents</a></b>
    </span>
  `,
})
export class FooterComponent {
}
