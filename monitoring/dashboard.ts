import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bullmq';

export class QueueDashboard {
	private readonly serverAdapter: ExpressAdapter;

	constructor(queues: Queue[]) {
		this.serverAdapter = new ExpressAdapter();

		createBullBoard({
			queues: queues.map((queue) => new BullMQAdapter(queue)),
			serverAdapter: this.serverAdapter,
		});
	}

	mount(app: express.Application, path: string = '/admin/queues'): void {
		app.use(path, this.serverAdapter.getRouter());
	}
}
