export interface Language {
    id: number;
    name: string;
    code: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    description?: string;
    isActive: boolean;
}