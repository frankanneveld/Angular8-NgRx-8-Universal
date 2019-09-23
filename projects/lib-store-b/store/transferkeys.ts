import {Injectable} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import { STORE_A_TRANSFER_KEY } from '../../lib-store-a/store/transferkeys';

export const STORE_B_TRANSFER_KEY = makeStateKey<any>('STORE_B_TRANSFER_KEY');

@Injectable()
export class Transferkeys {

  public remove() {
    this.transferState.remove(STORE_A_TRANSFER_KEY);
  }
  
  public get hasTransferKey(): boolean {
    return this.transferState.hasKey(STORE_B_TRANSFER_KEY);
  }

  public set transferKey(data: any) {
    this.transferState.set(STORE_B_TRANSFER_KEY, data);
  }

  public get transferKey(): any {
    let data: any;
    if (this.transferState.hasKey(STORE_B_TRANSFER_KEY)) {
      data = this.transferState.get<any>(STORE_B_TRANSFER_KEY, {});
      this.transferState.remove(STORE_B_TRANSFER_KEY);
    } else {
      data = null;
    }
    return data;
  }

  constructor(
    private transferState: TransferState) {
  }
}
