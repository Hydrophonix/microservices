// Core
import { FC }                     from "react";
import { CircularProgress, List } from "@mui/material";

// Components
import { Comment } from "./comment";

// Elements
import { Error } from "../../../elements";

// Instruments
import { useAppDispatch, useAppSelector } from "../../../state";
import { comments }                       from "../../../state/domains/comments";

export const Comments: FC = () => {
    const dispatch = useAppDispatch();
    const { list, loading, error } = useAppSelector((state) => state.comments);
    const user = useAppSelector((state) => state.auth.currentUser);

    const handleDeleteComment = (id: string) => {
        dispatch(comments.delete(id));
    };


    if (loading) {
        return (
            <CircularProgress />
        );
    }

    if (error) {
        return (
            <Error error = { error }/>
        );
    }

    return (
        <List>
            {list.map((comment) => (
                <Comment
                    comment = { comment }
                    handleDeleteComment = { handleDeleteComment }
                    key = { comment.id }
                    userId = { user!.id }
                />
            ))}
        </List>
    );
};
