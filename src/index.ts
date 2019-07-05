import server from './websocket'; // http/index.ts 에서 생성한 HTTP 서버를 import
import { connect_database } from './database';

/* Set timezone to UTC */
process.env.TZ = 'UTC';

// TODO: 나머지 코드를 작성

/* Activate MongoDB Connection */
connect_database();

/* Activate http server listen */
server.listen(parseInt(process.env.PORT, 10) | 3000);