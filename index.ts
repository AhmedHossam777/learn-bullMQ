import { EmailWorker } from './src/workers/email.worker';
import { EmailQueue } from './src/queues/email.queue';
import express from 'express';
import { QueueDashboard } from './monitoring/dashboard';

async function bootstrap() {
	// Initialize Express app
	const app = express();

	// Initialize queues
	const emailQueue = EmailQueue.getInstance();

	// Initialize workers
	const emailWorker = new EmailWorker();

	// Setup dashboard
	const dashboard = new QueueDashboard([emailQueue.getQueue()]);
	dashboard.mount(app);

	// Example usage
	app.post('/send-welcome', async (req, res) => {
		try {
			const { userId, email } = req.body;
			const jobId = await emailQueue.sendWelcomeEmail(userId, email);
			res.json({ jobId });
		} catch (error) {
			res.status(500).json({ error: 'Failed to queue email' });
		}
	});

	// Graceful shutdown
	process.on('SIGTERM', async () => {
		await emailQueue.close();
		await emailWorker.close();
		process.exit(0);
	});

	// Start server
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
}

bootstrap().catch(console.error);
