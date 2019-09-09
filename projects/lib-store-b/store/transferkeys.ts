import {Injectable} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';

export const STORE_B_TRANSFER_KEY = makeStateKey<any>('STORE_B_TRANSFER_KEY');

@Injectable()
export class Transferkeys {
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
