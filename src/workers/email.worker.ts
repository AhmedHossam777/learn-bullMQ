import { EmailService } from '../../services/email.service';
import { BaseWorker } from './base.worker';
import { Job } from 'bullmq';
import { EmailJob } from '../types/job.type';

export class EmailWorker extends BaseWorker<EmailJob> {
	private readonly emailService: EmailService;

	constructor() {
		super('email-queue', async (job: Job<EmailJob>) => {
			return this.processJob(job);
		});
		this.emailService = new EmailService();
	}

	private async processJob(job: Job<EmailJob>): Promise<void> {
		const { email, template, data } = job.data;

		try {
			await job.updateProgress(50);
			await this.emailService.sendEmail(email, template, data);
			await job.updateProgress(100);
		} catch (error) {
			console.error(`Failed to process email job ${job.id}:`, error);
			throw error;
		}
	}
}
