import { EmailJob } from '../types/job.type';
import { BaseQueue } from './base.queue';

export class EmailQueue extends BaseQueue<EmailJob> {
	private static instance: EmailQueue;

	private constructor() {
		super('email-queue');
	}

	static getInstance(): EmailQueue {
		if (!EmailQueue.instance) {
			EmailQueue.instance = new EmailQueue();
		}
		return EmailQueue.instance;
	}

	async sendWelcomeEmail(userId: number, email: string): Promise<string> {
		return this.addJob('welcome-email', {
			userId,
			email,
			template: 'welcome',
			data: { userId },
		});
	}
}
