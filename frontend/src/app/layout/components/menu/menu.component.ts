import { Component } from '@angular/core';
import { URL } from 'src/app/constant/url.constant';
import { CHARACTER } from 'src/app/constant/character.constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  // styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  urlMain: string = URL.MAIN
  slash: string = CHARACTER.SLASH
  coreURL: string = this.slash + this.urlMain + this.slash
  model: any[] = [
    {
      link: URL.HOME,
      label: URL.LABEL.HOME,
      icon: URL.ICON.HOME
    },
    {
      link: URL.CREATE_VOTING,
      label: URL.LABEL.CREATE_VOTING,
      icon: URL.ICON.CREATE_VOTING
    },
    {
      link: URL.RESULT_VOTING,
      label: URL.LABEL.RESULT_VOTING,
      icon: URL.ICON.RESULT_VOTING
    },
    {
      link: URL.DESCRIPTION,
      label: URL.LABEL.DESCRIPTION,
      icon: URL.ICON.DESCRIPTION
    },
  ]

  ngOnInit() {

  }
}
