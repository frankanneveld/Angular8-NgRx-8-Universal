import { Component, OnInit } from '@angular/core';
import {CopyService} from '@kpn-store';
import {FrankStoreService} from '@frank-store';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.scss']
})
export class ComponentAComponent implements OnInit {

  public response: any;

  constructor(public copyService: CopyService, public  frankStoreService: FrankStoreService) {

  }

  ngOnInit() {
    // this.copyService.allCopySubscription.subscribe(res => {
    //   console.log(res || 'cannot read store on server');
    // });

    this.frankStoreService.allFrankSubscription.subscribe( response => {
      if (response) {
        this.response = response;
        // console.log(response);
      }
    });
  }

}
