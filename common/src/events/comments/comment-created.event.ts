export interface CommentCreatedEvent {
    id: string;
    userId: string;
    postId: string;
    feedOwnerId: string;
    content: string;
    username: string;
}
