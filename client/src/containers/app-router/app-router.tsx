// Core
import { CircularProgress } from "@mui/material";
import { FC }               from "react";
import { Route, Switch }    from "react-router";

// Pages
import {
    CreateUserPage,
    EditUserPage,
    HomePage,
    NotFoundPage,
    Profile,
    SignIn,
    SignUp,
    UsersPage,
} from "../../pages";
import { useAppSelector } from "../../state";
import { AdminRoute }     from "./admin-route";

// Instruments
import { AuthRedirectRoute } from "./auth-redirect-route";
import { PrivateRoute }      from "./private-route";

export const AppRouter: FC = () => {
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    if (isLoading) {
        return (
            <CircularProgress color = "inherit"/>
        );
    }

    return (
        <Switch>
            <PrivateRoute path = "/profile">
                <Profile />
            </PrivateRoute>

            <AuthRedirectRoute path = "/signup">
                <SignUp />
            </AuthRedirectRoute>
            <AuthRedirectRoute path = "/signin">
                <SignIn />
            </AuthRedirectRoute>

            <AdminRoute path = "/users/create">
                <CreateUserPage />
            </AdminRoute>
            <AdminRoute path = "/users/:userId">
                <EditUserPage />
            </AdminRoute>
            <AdminRoute path = "/users">
                <UsersPage />
            </AdminRoute>

            <Route
                exact
                path = "/">
                <HomePage />
            </Route>
            <Route path = "*">
                <NotFoundPage />
            </Route>
        </Switch>
    );
};
