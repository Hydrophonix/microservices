// Core
import { Backdrop, Box, Button, CircularProgress, TextField } from "@mui/material";
import { FC, FormEventHandler, useEffect, useState }          from "react";
import { useLocation, useParams }                             from "react-router";
import { createStructuredSelector }                           from "reselect";
// Components
import { PageBackHeader } from "../../components";
// Elements
import { PageContainer } from "../../elements";
// Instruments
import { useAppDispatch, useAppSelector, users } from "../../state";
import { User }                                  from "../../state/domains/users/users.types";

interface EditUserPageParams {
    userId: string;
}

export const EditUserPage: FC = () => {
    const { state } = useLocation<User|null>();
    const { userId } = useParams<EditUserPageParams>();
    const dispatch = useAppDispatch();
    const { editUser, isLoading } = useAppSelector(createStructuredSelector({
        editUser:  (state) => state.users.edit,
        isLoading: (state) => state.users.isLoading,
    }));

    const user = state || editUser;
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");

    useEffect(() => {
        if (userId !== user?.id) {
            dispatch(users.get(userId));
        } else {
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [ userId, dispatch, user ]);

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        dispatch(
            users.update({
                id:   user!.id,
                data: {
                    email,
                    username,
                },
            }),
        );
    };

    return (
        <PageContainer>
            <PageBackHeader>
                Edit User ID:${userId}
            </PageBackHeader>

            <Box
                autoComplete = "off"
                component = "form"
                sx = {{
                    display:       "flex",
                    alignItems:    "center",
                    flexDirection: "column",
                }}
                onSubmit = { handleFormSubmit }>
                <TextField
                    required
                    label = "Username"
                    margin = "dense"
                    value = { username }
                    variant = "outlined"
                    onChange = { (event) => setUsername(event.target.value) }
                />

                <TextField
                    required
                    label = "Email"
                    margin = "dense"
                    type = "email"
                    value = { email }
                    variant = "outlined"
                    onChange = { (event) => setEmail(event.target.value) }
                />

                <Button
                    sx = {{ marginTop: 3 }}
                    type = "submit"
                    variant = "contained">
                    Edit User
                </Button>
            </Box>

            <Backdrop open = { isLoading || !user }>
                <CircularProgress />
            </Backdrop>
        </PageContainer>
    );
};
