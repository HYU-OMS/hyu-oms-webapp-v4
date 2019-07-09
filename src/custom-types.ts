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