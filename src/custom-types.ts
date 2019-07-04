/*
 * Custom Type 은 기본 Object 에 임의로 데이터를 추가하는 경우를 위해 만들었습니다.
 * 예를 들어 저는 Request Object 에 jwt_info 를 추가한 후 next() 호출을 통해 다음 handler 에서 추가된 데이터를 활용할 수 있도록 하고 있습니다.
 * TypeScript 에서는 이렇게 임의로 추가하는 데이터에 대해서도 type define 을 요구하고 있습니다.
 * 따라서 임의로 수정을 가하는 Type 들을 여기에 모아놨습니다.
 */
import { Request, Response } from "express";

export interface CustomRequest extends Request {
  jwt_info?: object; // Request 정보에 JWT 가 존재하고 이를 성공적으로 decode 한 경우 해당 정보가 여기에 담기게 됩니다.
}

export interface CustomResponse extends Response {

}