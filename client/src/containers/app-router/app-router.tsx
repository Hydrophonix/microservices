// Core
import { CircularProgress } from "@mui/material";
import { FC }               from "react";
import { Route, Switch }    from "react-router";

// Pages
import {
    CreatePostPage,
    CreateUserPage,
    EditUserPage,
    FeedPage,
    HomePage,
    NotFoundPage,
    PostPage,
    Profile,
    SignIn,
    SignUp,
    UsersPage,
} from "../../pages";

// Components
import { AdminRoute }        from "./admin-route";
import { AuthRedirectRoute } from "./auth-redirect-route";
import { PrivateRoute }      from "./private-route";

// Instruments
import { useAppSelector } from "../../state";

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
            <PrivateRoute path = "/feed">
                <FeedPage />
            </PrivateRoute>
            <PrivateRoute path = "/create-post">
                <CreatePostPage />
            </PrivateRoute>
            <PrivateRoute path = "/posts/:postId">
                <PostPage />
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
