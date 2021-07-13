import pino from 'pino';
import dotenv from 'dotenv';
import stream from 'stream';
import childProcess from 'child_process';

dotenv.config({ path: __dirname + '/.env' });

const { env } = process;
let logger: pino.Logger;
if (env.NODE_ENV !== 'production') {
  logger = pino({
    level: 'debug',
    prettyPrint: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: 'SYS:standard',
    },
  });
} else {
  const cwd = process.cwd();
  const logPath = env.LOGS_PATH;
  console.log(logPath);
  const logThrough = new stream.PassThrough();
  logger = pino({ level: 'error' }, logThrough);
  const child = childProcess.spawn(
    process.execPath,
    [
      require.resolve('pino-tee'),
      'error',
      `${logPath}/error.log`,
      'info',
      `${logPath}/info.log`,
    ],
    { cwd, env }
  );
  logThrough.pipe(child.stdin);
}

export default logger;
