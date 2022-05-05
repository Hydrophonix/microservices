// Core
import { all, fork } from "@redux-saga/core/effects";

// Sagas
import { watchAuthAsync }     from "./domains/auth/auth.saga";
import { watchCommentsAsync } from "./domains/comments/comments.saga";
import { watchFeedAsync }     from "./domains/feed/feed.saga";
import { watchPostsAsync }    from "./domains/posts/posts.saga";
import { watchUsersAsync }    from "./domains/users/users.saga";

export function* rootSaga() {
    yield all([
        fork(watchAuthAsync),
        fork(watchUsersAsync),
        fork(watchFeedAsync),
        fork(watchPostsAsync),
        fork(watchCommentsAsync),
    ]);
}
