// Core
import { FC }                                 from "react";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { Delete }                             from "@mui/icons-material";

// Instruments
import { Comment as IComment } from "../../../state/domains/comments/comments.types";

interface CommentProps {
    comment: IComment;
    handleDeleteComment: Function;
    userId: string;
}

export const Comment: FC<CommentProps> = ({ comment, handleDeleteComment, userId }) => {
    return (
        <ListItem
            secondaryAction = {
                userId === comment.userId && (
                    <IconButton
                        aria-label = "delete"
                        edge = "end"
                        onClick = { () => handleDeleteComment(comment.id) }>
                        <Delete />
                    </IconButton>
                )
            }>
            <ListItemText
                primary = { comment.username }
                secondary = { comment.content }
            />
        </ListItem>
    );
};
