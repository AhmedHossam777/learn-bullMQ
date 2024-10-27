import { JobsOptions, Queue, QueueOptions } from 'bullmq';
import { redisConnection } from '../config/redis.config';

export abstract class BaseQueue<T> {
	protected queue: Queue;

	constructor(queueName: string, options?: QueueOptions) {
		const defaultOptions: QueueOptions = {
			connection: redisConnection,
			defaultJobOptions: {
				attempts: 3,
				backoff: {
					type: 'exponential',
					delay: 1000,
				},
				removeOnComplete: true,
			},
		};

		this.queue = new Queue(queueName, Object.assign(defaultOptions, options));
	}

	async addJob(name: string, data: T, opts?: JobsOptions): Promise<string> {
		const job = await this.queue.add(name, data, opts);
		return job.id as string;
	}

	async close(): Promise<void> {
		await this.queue.close();
	}
}
