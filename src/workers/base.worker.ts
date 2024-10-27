import { Job, Worker, WorkerOptions } from 'bullmq';
import { redisConnection } from '../config/redis.config';

export abstract class BaseWorker<T> {
	protected worker: Worker;

	constructor(
		queueName: string,
		processor: (job: Job<T>) => Promise<any>,
		options: WorkerOptions = { connection: redisConnection }
	) {
		this.worker = new Worker(queueName, processor, {
			concurrency: 5,
			...options,
		});

		this.setupListeners();
	}

	private setupListeners(): void {
		this.worker.on('completed', (job) => {
			console.log(`Job ${job.id} completed`);
		});

		this.worker.on('failed', (job, error) => {
			console.error(`Job ${job?.id} failed:`, error);
		});

		this.worker.on('error', (error) => {
			console.error('Worker error:', error);
		});
	}

	async close() {
		await this.worker.close();
	}
}
