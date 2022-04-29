// Core
import { CircularProgress } from "@mui/material";
import { FC }               from "react";

// Instruments
import { useAppSelector } from "../../../state";

export const Feed: FC = () => {
    const { posts, isLoading } = useAppSelector((state) => state.feed);
    console.log("<<=|X|=>> ~ file: feed.tsx ~ line 10 ~ posts", posts);

    if (isLoading) {
        return (
            <CircularProgress />
        );
    }

    return (
        <div>
            <button>create post</button>
            <div>test</div>
        </div>
    );
};
