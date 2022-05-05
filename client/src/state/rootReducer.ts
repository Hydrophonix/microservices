// Core
import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter }   from "connected-react-router";

// Reducers
import { usersReducer }    from "./domains/users/users.slice";
import { authReducer }     from "./domains/auth/auth.slice";
import { uiReducer }       from "./domains/ui/ui.slice";
import { feedReducer }     from "./domains/feed/feed.slice";
import { postsReducer }    from "./domains/posts/posts.slice";
import { commentsReducer } from "./domains/comments/comments.slice";

// Instruments
import { history } from "./history";

export const rootReducer = combineReducers({
    router:   connectRouter(history),
    ui:       uiReducer,
    auth:     authReducer,
    users:    usersReducer,
    feed:     feedReducer,
    posts:    postsReducer,
    comments: commentsReducer,
});
