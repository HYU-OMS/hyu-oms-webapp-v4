import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaStatic from 'koa-static';
import * as http from 'http';
import * as path from 'path';

const app: Koa = new Koa();
const router: KoaRouter = new KoaRouter();

/*
 * 이 부분은 Static File 을 serve 하는 코드임.
 * NODE_ENV 에 따라 Static file serve 방식을 다르게 함
 */
if(process.env.NODE_ENV === 'development') {

}
else {
  app.use(KoaStatic(path.join(__dirname, '../', 'react-app', 'build')));
}

/* HTTP 서버를 생성 후 export */
const server: http.Server = http.createServer(app.callback());
export default server;