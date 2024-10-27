export interface EmailJob {
	userId: number;
	email: string;
	template: string;
	data: Record<string, any>;
}

export interface ProcessingJob {
	fileUrl: string;
	processType: 'resize' | 'compress' | 'convert';
	options: Record<string, any>;
}

export type jobType = ProcessingJob | EmailJob;
