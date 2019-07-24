/* React Redux 에서 사용되는 auth state 의 형태 */
export interface ReduxAuthState {
  jwt?: string;
  group_id?: string;
  role?: number;
  api_url: string;
}

/* React Redux 에서 사용되는 real time sync state 의 형태 */
export interface ReduxRealTimeNotificationState {
  notifications: Array<RealTimeNotificationItem>
  order_last_updated: Date;
  queue_last_updated: Date;
  menu_last_updated: Date;
  setmenu_last_updated: Date
}

/* 실시간 업데이트 목록에 들어가는 item 의 구조 */
export interface RealTimeNotificationItem {
  category: string; // 'order', 'queue', 'menu', 'setmenu'
  variant: string; // 'success', 'error', 'warning', 'info'
  message: string; // 업데이트 목록에 표시될 메세지,
  data: Date; // Notification 생성 시간
}