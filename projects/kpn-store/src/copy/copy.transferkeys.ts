import {Injectable} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';


// export const COPY_KEY = makeStateKey<any>('COPY_KEY');
export const LOAD_FROM_SERVER = makeStateKey<boolean>('LOAD_FROM_SERVER');


@Injectable()
export class CopyTransferkeys {

  // // COPY_KEY
  // public set copyKey(copy: any) {
  //   this.transferState.set(COPY_KEY, copy);
  // }
  //
  // public get copyKey(): any {
  //   let copy: any;
  //   if (this.transferState.hasKey(COPY_KEY)) {
  //     copy = this.transferState.get<any>(COPY_KEY, null);
  //     this.transferState.remove(COPY_KEY);
  //   } else {
  //     copy = null;
  //   }
  //   return copy;
  // }

  // LOAD_FROM_SERVER
  public get hasLoadFromServer(): boolean {
    return this.transferState.hasKey(LOAD_FROM_SERVER);
  }

  public set serverLoadKey(onServer: boolean) {
    this.transferState.set(LOAD_FROM_SERVER, onServer);
  }

  public get serverLoadKey(): boolean {
    let onServer: boolean;
    if (this.transferState.hasKey(LOAD_FROM_SERVER)) {
      onServer = this.transferState.get<boolean>(LOAD_FROM_SERVER, false);
      this.transferState.remove(LOAD_FROM_SERVER);
    } else {
      onServer = null;
    }
    return onServer;
  }

  constructor(
    private transferState: TransferState) {
  }
}
