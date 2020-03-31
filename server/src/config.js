var env = process.env.NODE_ENV || 'dev';

var config = {
  dev: {
    db: 'mongodb://127.0.0.1/research',
    db_name: 'test',
    user: 'kevinc',
    pass: 'abc123',
    port: 7000,
    sessionSecret: 'secret',
    sid: 'sid',
    behindProxy: false,
  },
};
module.exports = config[env];
