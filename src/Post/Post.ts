export interface Message {
  name: string;
  postId: string;
  content: string;
  created_at?: Date;
  userId?: string;
}

export class Post {
  static posts: Message[] = [];
}
