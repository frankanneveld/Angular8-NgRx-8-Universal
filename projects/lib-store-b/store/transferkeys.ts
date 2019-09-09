import {Injectable} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';

export const FRANK_TRANSFER_KEY = makeStateKey<any>('FRANK_TRANSFER_KEY');

@Injectable()
export class Transferkeys {
  public get hasTransferKey(): boolean {
    return this.transferState.hasKey(FRANK_TRANSFER_KEY);
  }

  public set transferKey(data: any) {
    this.transferState.set(FRANK_TRANSFER_KEY, data);
  }

  public get transferKey(): any {
    let data: any;
    if (this.transferState.hasKey(FRANK_TRANSFER_KEY)) {
      data = this.transferState.get<any>(FRANK_TRANSFER_KEY, {});
      this.transferState.remove(FRANK_TRANSFER_KEY);
    } else {
      data = null;
    }
    return data;
  }

  constructor(
    private transferState: TransferState) {
  }
}
