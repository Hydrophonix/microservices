export interface CommentCreatedEvent {
    id: string;
    userId: string;
    postId: string;
    feedId: string;
    content: string;
    username: string;
}
