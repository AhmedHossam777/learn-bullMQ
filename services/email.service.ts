export class EmailService {
	async sendEmail(
		to: string,
		template: string,
		data: Record<string, any>
	): Promise<void> {
		// Implement your email sending logic here
		console.log(`Sending ${template} email to ${to} with data:`, data);
	}
}
