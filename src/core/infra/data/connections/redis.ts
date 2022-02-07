import IORedis from "ioredis";

export default class Redis {
  private static connection: IORedis.Redis;

  static async getConnection(): Promise<IORedis.Redis> {
    return this.connection;
  }
  
  async openConnection(): Promise<void> {
    if (!Redis.connection) {
      try {
        Redis.connection = new IORedis(process.env.REDISCLOUD_URL);
      } catch (error) {
        throw new Error(`Erro ao connectar no Redis -> ${error}`);
      }
    }
  }
}
