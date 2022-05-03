export interface CommentCreatedEvent {
    id: string;
    userId: string;
    postId: string;
    content: string;
}
