import {Component, OnInit} from '@angular/core';
import { StoreService as ServiceA } from '@lib-store-a';
import { CookieService } from 'ngx-cookie-service';
import { PlatformService } from '../../services/platform.service';
import { forFeatureName as featureStoreA} from '@lib-store-a';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {
  public result: any;

  private json = {
    version: '1.0.1'
  };

  constructor(public serviceA: ServiceA,
              private cookieService: CookieService,
              private platformService: PlatformService) {
    serviceA.allSubscription.subscribe( res => {
      this.result = res;
    });
  }
  ngOnInit() {
    if (this.platformService.isBrowser) {
      if (!this.cookieService.check(featureStoreA)) this.cookieService.set(featureStoreA, JSON.stringify(this.json));
    }
  }
}
