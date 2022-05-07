// Core
import { FC, useEffect }                from "react";
import { useLocation, useParams }       from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";

// Components
import { PageBackHeader } from "../../components";
import { Comments }       from "./comments";

// Elements
import { Error, PageContainer } from "../../elements";

// Instruments
import { Post }                                  from "../../state/domains/posts/posts.types";
import { posts, useAppDispatch, useAppSelector } from "../../state";
import { PostControlPanel }                      from "./post-control-panel";
import { comments }                              from "../../state/domains/comments";

export const PostPage: FC = () => {
    const { state } = useLocation<Post|null>();
    const { postId } = useParams<{ postId: string }>();
    const dispatch = useAppDispatch();
    const { edit, loading, error } = useAppSelector((state) => state.posts);

    const post = state || edit;


    useEffect(() => {
        if (postId !== post?.id) {
            dispatch(posts.get(postId));
        }
    }, [ postId, dispatch, post ]);


    useEffect(() => {
        post?.comments
            ? dispatch(comments.set(post!.comments))
            : post && dispatch(comments.find(post.id));
    }, [ dispatch, post ]);


    if (loading || (!post && !error)) {
        return (
            <CircularProgress />
        );
    }

    if (!post && error) {
        return (
            <Error error = { error }/>
        );
    }

    return (
        <PageContainer>
            <PageBackHeader>
                {post?.title}
            </PageBackHeader>

            <Typography sx = {{ marginBottom: 2 }}>
                {post?.content}
            </Typography>

            <PostControlPanel
                feedOwnerId = { post?.userId }
                postId = { post!.id }
            />

            <Comments />
        </PageContainer>
    );
};
