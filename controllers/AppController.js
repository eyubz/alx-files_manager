/**
 * App controller
 */
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(_, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    res.status(200).send(status);
  }

  static getStats(_, res) {
    const stats = {
      users: dbClient.nbUsers(),
      files: dbClient.nbFiles(),
    };
    res.status(200).send(stats);
  }
}

export default AppController;
