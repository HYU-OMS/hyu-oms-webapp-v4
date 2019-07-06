/* React Redux 에서 사용되는 auth state 의 형태 */
export interface ReduxAuthState {
  jwt?: string;
  group_id?: string;
  role?: number;
  api_url: string;
}

/* React Redux 에서 사용되는 real time sync state 의 형태 */
export interface ReduxRealTimeSyncState {

}

/* Custom Queue type */
export class Queue {
  private _array: Array<any>;

  constructor() {
    this._array = [];
  }

  public push = (item: any): void => {
    this._array.push(item);
  };

  public front = (): any | null => {
    if(this._array.length > 0) {
      return this._array[0];
    }
    else {
      return null;
    }
  };

  public pop = (): void => {
    if(this._array.length > 0) {
      this._array.shift();
    }
  };

  public size = (): number => {
    return this._array.length;
  };

  public empty = (): boolean => {
    return (this._array.length === 0);
  };
}