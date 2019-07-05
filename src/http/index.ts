import * as express from 'express';
import * as asyncify from 'express-asyncify';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as httpProxy from 'http-proxy';
import * as http from 'http';
import * as path from 'path';

/* To use Typescript types */
import { Application } from 'express';
import { Server } from 'http';
import { CustomRequest, CustomResponse } from '../custom-types';

import api_controller from './api_controller';

const app: Application = asyncify(express());

/* Development 일 경우 console 에 log 표시 */
if(process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

/* 기본 설정 */
app.enable('trust proxy');
app.use(helmet());

/* '/api' 로 들어오는 모든 요청은 아래 handler 가 처리하게 됨. */
app.use('/api', api_controller);

/*
 * 이 부분은 Static File 을 serve 하는 코드임.
 * NODE_ENV 에 따라 Static file serve 방식을 다르게 함
 */
if(process.env.NODE_ENV === 'production') {
  /* 기본적으로 요청한 file 을 전송한다. */
  app.use(express.static(path.join(__dirname, '../', 'react-app', 'build')));

  /* 다만, 요청한 파일이 없을 경우 기본값으로 index.html 을 보내준다. (React 에서 URI route 관련해서 나머지를 처리한다) */
  app.use('*', async (req: CustomRequest, res: CustomResponse) => {
    res.sendFile(path.join(__dirname, '../', 'react-app', 'build', 'index.html'));
  });
}
else {
  const proxy: httpProxy = httpProxy.createProxyServer({});
  app.use(async (req: CustomRequest, res: CustomResponse) => {
    proxy.web(req, res, { target: 'http://localhost:8899' });
  });
}

/* HTTP 서버를 생성 후 export */
const server: Server = http.createServer(app);
export default server;