import {Injectable} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';

export const COPY_TRANSFER_KEY = makeStateKey<any>('COPY_TRANSFER_KEY');

@Injectable()
export class CopyTransferkeys {
  public get hasCopyTransferKey(): boolean {
    return this.transferState.hasKey(COPY_TRANSFER_KEY);
  }

  public set copyTransferKey(data: any) {
    this.transferState.set(COPY_TRANSFER_KEY, data);
  }

  public get copyTransferKey(): any {
    let data: any;
    if (this.transferState.hasKey(COPY_TRANSFER_KEY)) {
      data = this.transferState.get<any>(COPY_TRANSFER_KEY, {});
      this.transferState.remove(COPY_TRANSFER_KEY);
    } else {
      data = null;
    }
    return data;
  }

  constructor(
    private transferState: TransferState) {
  }
}
