import { Component, OnInit } from '@angular/core';
import { StoreService as ServiceB } from '@lib-store-b';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.scss']
})
export class ComponentBComponent implements OnInit {
  public result: any;

  constructor(public serviceB: ServiceB) {
    serviceB.allSubscription.subscribe(res => {
      this.result = res;
    });
  }

  ngOnInit() {
  }
}
