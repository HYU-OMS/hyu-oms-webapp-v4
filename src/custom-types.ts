/*
 * Custom Type 은 기본 Object 에 임의로 데이터를 추가하는 경우를 위해 만들었습니다.
 * 예를 들어 저는 Request Object 에 jwt_info 를 추가한 후 next() 호출을 통해 다음 handler 에서 추가된 데이터를 활용할 수 있도록 하고 있습니다.
 * TypeScript 에서는 이렇게 임의로 추가하는 데이터에 대해서도 type define 을 요구하고 있습니다.
 * 따라서 임의로 수정을 가하는 Type 들을 여기에 모아놨습니다.
 */
import { Request, Response } from 'express';

export interface CustomRequest extends Request {
  /*
   * 아직 JWT payload 형식을 확정하지 않아서 지금은 any type 으로 지정함.
   * 이후에 payload 형식 확정 시 해당 type 정의해서 any 대신에 사용할 것.
   */
  // TODO: payload 형식 정하기
  user_info?: any; // Request 정보에 JWT 가 존재하고 이를 성공적으로 decode 한 경우 해당 정보가 여기에 담기게 됩니다.
}

export interface CustomResponse extends Response {

}

/* '/user' 에 POST 로 들어오는 request 의 body 형식을 정의 */
export interface UserPost {
  type: string; // should be 'facebook' or 'kakao'
  access_token: string; // should be valid token belongs to 'facebook' or 'kakao'
}

/*
 * npm 'request-promise-native' 에서 사용되는 option 의 형식을 정의
 * 'headers' 와 'qs' 의 경우 매 사용 시마다 어떤 정보를 넣을지 모르게 때문에 any 로 정의했으며 undefined 일 수도 있어서 '?' 를 지정함.
 */
export interface RequestPromiseOption {
  method: string;
  uri: string;
  headers?: any;
  qs?: any;
  resolveWithFullResponse: boolean;
}

/* facebook api request 를 통해 얻게 되는 user info 의 형식을 정의 (v3.3 기준) */
export interface FacebookUserInfo {
  id: number; // Facebook user's unique id (integer)
  name: string; // Facebook user's name
}

/* kakao api request 를 통해 얻게 되는 user info 의 형식을 정의 (v2 기준) */
export interface KakaoUserInfo {
  id: number;
  properties: {
    nickname: string
  }
}

/* React Redux 에서 사용되는 state 의 형태 */
export interface ReduxAuthState {
  jwt?: string;
  group_id?: string;
  role?: number;
  api_url: string;
}