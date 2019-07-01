import * as Koa from 'koa';
import * as http from 'http';

const app: Koa = new Koa();

// TODO: 나머지 코드를 작성

/* HTTP 서버를 생성 후 export */
const server: http.Server = http.createServer(app.callback());
export default server;