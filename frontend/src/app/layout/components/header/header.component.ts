import { Component } from '@angular/core';
import { CHARACTER } from 'src/app/constant/character.constant';
import { URL } from 'src/app/constant/url.constant';
import { SharedService } from 'src/app/services/shared.service';
import { UtilModule } from 'src/app/util/util.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  urlMain: string = URL.MAIN
  slash: string = CHARACTER.SLASH
  coreURL: string = this.slash + this.urlMain + this.slash
  homeURL: string = this.coreURL + URL.HOME



  constructor(
    private utilModule: UtilModule,
    private sharedService: SharedService
  ) {

  }

  ngOnInit() {

  }
  
  connectMetamask() {
    this.utilModule.connectWallet();
  }

  selectAccount(account: string) {
    this.utilModule.selectAccount(account);
  }

  onSearch(event: Event) {
    const searchData = event.target as HTMLInputElement
    this.sharedService.sendInput(searchData.value)
  }
}
