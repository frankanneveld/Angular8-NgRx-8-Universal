import {Component, OnInit} from '@angular/core';
import { StoreService as ServiceA } from '@lib-store-a';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {
  public result: any;

  constructor(public serviceA: ServiceA) {
    serviceA.allSubscription.subscribe( res => {
      this.result = res;
    });
  }
  ngOnInit() {

  }
}
