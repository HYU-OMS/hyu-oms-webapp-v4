import * as express from 'express';
import * as asyncify from 'express-asyncify';
import * as httpProxy from 'http-proxy';
import * as http from 'http';
import * as path from 'path';

const app: express.Application = asyncify(express());

/* "/api" 로 들어오는 모든 요청은 아래 handler 가 처리하게 됨. */
// TODO: 관련 코드 작성

/*
 * 이 부분은 Static File 을 serve 하는 코드임.
 * NODE_ENV 에 따라 Static file serve 방식을 다르게 함
 */
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'react-app', 'build')));
}
else {
  const proxy: httpProxy = httpProxy.createProxyServer({});
  app.use(async (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:8899' });
  });
}

/* HTTP 서버를 생성 후 export */
const server: http.Server = http.createServer(app);
export default server;