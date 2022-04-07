// Core
import { Button } from "@mui/material";
import { push }   from "connected-react-router";
import { FC }     from "react";

// Elements
import { PageContainer, PageHeader } from "../../elements";

// Instruments
import { useAppDispatch } from "../../state";
import { UserTable }      from "./user-table";

export const UsersPage: FC = () => {
    const dispatch = useAppDispatch();

    return (
        <PageContainer>
            <PageHeader>
                Users
            </PageHeader>

            <UserTable />

            <Button
                color = "primary"
                sx = {{ marginTop: 2 }}
                variant = "contained"
                onClick = { () => dispatch(push("/users/create")) }>
                CREATE USER
            </Button>
        </PageContainer>
    );
};
