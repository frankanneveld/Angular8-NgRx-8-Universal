import {Component, OnInit} from '@angular/core';
import {CopyService} from '@kpn-store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(public copyService: CopyService) {

  }

  ngOnInit(): void {
    this.copyService.allCopySubscription.subscribe(res => {
      console.log(res || 'cannot read store on server');
    });
  }
}
