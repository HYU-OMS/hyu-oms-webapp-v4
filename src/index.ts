import server from './websocket'; // http/index.ts 에서 생성한 HTTP 서버를 import

/* Set timezone to UTC */
process.env.TZ = 'UTC';

// TODO: 나머지 코드를 작성

server.listen(parseInt(process.env.PORT, 10) | 3000);