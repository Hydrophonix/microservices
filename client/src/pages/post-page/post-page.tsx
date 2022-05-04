// Core
import { FC, useEffect }                             from "react";
import { useLocation, useParams }                    from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

// Components
import { PageBackHeader } from "../../components";

// Elements
import { PageContainer } from "../../elements";

// Instruments
import { Post }                                  from "../../state/domains/posts/posts.types";
import { posts, useAppDispatch, useAppSelector } from "../../state";
import { PostControlPanel }                      from "./post-control-panel";

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

    if (loading || (!post && !error)) {
        return (
            <CircularProgress />
        );
    }

    if (!post && error) {
        return (
            <Box sx = {{ display: "flex", flexDirection: "column" }}>
                <Typography
                    color = { (theme) => theme.palette.error.main }
                    variant = "h4">
                    Error: {error.statusCode}
                </Typography>
                <Typography
                    align = "center"
                    color = { (theme) => theme.palette.error.dark }
                    variant = "subtitle1">
                    {error.message}
                </Typography>
            </Box>
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
                author = { post?.userId }
                postId = { post!.id }
            />
        </PageContainer>
    );
};
