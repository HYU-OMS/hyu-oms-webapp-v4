import * as createError from 'http-errors';
import * as express from 'express';
import * as asyncify from 'express-asyncify';
import * as rp from 'request-promise-native';
import * as uuidv4 from 'uuid/v4';
import * as jwt from 'jsonwebtoken';

/* To use Typescript types */
import { Router } from 'express';
import {
  CustomRequest, CustomResponse,
  UserPost,
  RequestPromiseOption,
  FacebookUserInfo, KakaoUserInfo
} from '../../../../custom-types';

import config from '../../../../config';

const jwt_config: any = config['v4']['jwt'];
const router: Router = asyncify(express.Router());

/* 회원가입 및 로그인을 담당한다 */
router.post('/', async (req: CustomRequest, res: CustomResponse) => {
  const content: UserPost = req.body || {};

  const auth_type: string = content['type'];
  if(auth_type === 'facebook') {
    const fb_access_token: string = content['access_token'];
    if(Boolean(fb_access_token) === false) {
      throw createError(400, "'access_token' must be provided!", {
        state: 'REQUIRED_VALUE_EMPTY_ERR',
        info: ['access_token']
      });
    }

    /* Facebook API Server 에 요청을 보내기 위한 옵션 */
    const options: RequestPromiseOption = {
      "method": "GET",
      "uri": "https://graph.facebook.com/v3.3/me",
      "qs": {
        "access_token": fb_access_token,
        "fields": "id,name"
      },
      "resolveWithFullResponse": true
    };

    let profile: FacebookUserInfo = undefined;
    try {
      const resp: any = await rp(options);
      const resp_body: any = resp['body'];

      profile = JSON.parse(resp_body);
    }
    catch(err) {
      const resp: any = err['response'];
      const resp_body: any = JSON.parse(resp['body']);

      const status_code: number = parseInt(resp['statusCode'], 10) || 500;
      const message: string = resp_body['error']['message'] || "Facebook API Server Error!";

      throw createError(status_code, message, {
        state: 'FACEBOOK_API_ERR'
      });
    }

    /* Facebook 유저 고유번호를 받는다. */
    const fb_id: number = parseInt((profile['id']).toString(), 10);

    /* Facebook 유저 이름을 받는다. */
    const fb_nick: string = profile['name'];

    const auth_uuid: string = uuidv4();

    // TODO: DB 접근 관련 코드 작성

    // TODO: DB 접근 코드 작성 후 주석 해제 예정
    const token: string = jwt.sign({
      //"user_id": user_data['id'],
      //"user_name": user_data['name'],
      "auth_uuid": auth_uuid
    }, jwt_config['secret_key'], {
      "algorithm": jwt_config['algorithm'],
      "expiresIn": "24h"
    });

    res.status(200);
    res.json({"jwt": token});
  }
  else if(auth_type === 'kakao') {
    const kakao_access_token: string = content['access_token'];
    if(Boolean(kakao_access_token) === false) {
      throw createError(400, "'access_token' must be provided!", {
        state: 'REQUIRED_VALUE_EMPTY_ERR',
        info: ['access_token']
      });
    }

    // Kakao API Server 에 요청을 보내기 위한 옵션
    const options: RequestPromiseOption = {
      "method": "GET",
      "uri": "https://kapi.kakao.com/v2/user/me",
      "headers": {
        "Authorization": "Bearer " + kakao_access_token
      },
      "resolveWithFullResponse": true
    };

    /* Kakao 유저 정보를 받아온다. */
    let profile: KakaoUserInfo = undefined;
    try {
      const resp: any = await rp(options);
      const resp_body: any = resp['body'];

      profile = JSON.parse(resp_body);
    } catch(err) {
      const resp: any = err['response']; // response object 를 받는다.
      const resp_body: any = JSON.parse(resp['body']); // response body 를 받아 JSON parse 진행한다.

      const status_code: number = parseInt(resp['statusCode'], 10) || 500;
      const message: string = resp_body['msg'] || "Kakao API Server Error!";

      throw createError(status_code, message, {
        state: 'KAKAO_API_ERR'
      });
    }

    /* Kakao 유저 고유번호를 받는다. */
    const kakao_id: number = parseInt((profile['id']).toString(), 10);

    /* Kakao 유저 닉네임을 받는다. */
    const kakao_nick: string = profile['properties']['nickname'];

    const auth_uuid: string = uuidv4();

    // TODO: DB 접근 관련 코드 작성

    // TODO: DB 접근 코드 작성 후 주석 해제 예정
    const token: string = jwt.sign({
      //"user_id": user_data['id'],
      //"user_name": user_data['name'],
      "auth_uuid": auth_uuid
    }, jwt_config['secret_key'], {
      "algorithm": jwt_config['algorithm'],
      "expiresIn": "24h"
    });

    res.status(200);
    res.json({"jwt": token});
  }
  else {
    throw createError(400, "'type' must be 'facebook' or 'kakao'!", {
      state: 'REQUIRED_VALUE_EMPTY_ERR',
      info: ['type']
    });
  }
});

export default router;