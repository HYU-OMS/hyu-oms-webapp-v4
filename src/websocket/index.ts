import * as WebSocket from 'ws';
import server from '../http'; // http/index.ts 에서 생성한 HTTP 서버를 import

/* To use Typescript types */
import { Server } from 'ws';

const wss: Server = new WebSocket.Server({ server });

// TODO: 나머지 코드를 작성

/* http/index.ts 에서 생성한 HTTP 서버를 다시 export */
export default server;