import { ConnectionOptions } from 'bullmq';

export const redisConnection: ConnectionOptions = {
	host: process.env.REDIS_HOST || 'localhost',
	port: parseInt(process.env.REDIS_PORT || '6379'),
	password: process.env.REDIS_PASSWORD,
	username: process.env.REDIS_USERNAME,
};
