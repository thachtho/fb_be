export interface Message {
    name: string;
    postId: string;
    content: string;
    created_at?: Date;
    userId?: string;
}
export declare class Post {
    static posts: Message[];
}
