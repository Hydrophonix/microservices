// Core
import { Button }        from "@mui/material";
import { FC, useEffect } from "react";
import { push }          from "connected-react-router";

// Components
import { Feed } from "./feed";

// Elements
import { PageContainer, PageHeader } from "../../elements";

// Instruments
import { useAppDispatch } from "../../state";
import { feed }           from "../../state/domains";

export const FeedPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(feed.get());
    }, [ dispatch ]);

    return (
        <PageContainer>
            <PageHeader>
                Feed page
            </PageHeader>

            <Feed />

            <Button
                color = "primary"
                sx = {{ marginTop: 2 }}
                variant = "contained"
                onClick = { () => dispatch(push("/create-post")) }>
                CREATE POST
            </Button>
        </PageContainer>
    );
};
