import * as mongoose from 'mongoose';
import config from '../config';

const db_cfg: any = config['v4']['mongodb'];
const connect_url = `mongodb://${db_cfg['user']}:${db_cfg['pwd']}@${db_cfg['host']}:${db_cfg['port']}/admin`;

const connect_database: any = async () => {
  try {
    await mongoose.connect(connect_url, { dbName: db_cfg['db'], useNewUrlParser: true });
  } catch(err) {
    console.error(err);
    process.exit(-1);
  }
};

export {
  connect_database
};