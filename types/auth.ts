export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    xp: number;
    level: number;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    lastLogout: Date;
}