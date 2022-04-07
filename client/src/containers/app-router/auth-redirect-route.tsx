// Core
import { FC, ReactNode }   from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector }  from "../../state";

interface AuthRedirectRouteProps {
    path: string;
    children: ReactNode;
}

export const AuthRedirectRoute: FC<AuthRedirectRouteProps> = ({ children, path }) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    return (
        <Route
            exact
            path = { path }>
            {!isLoggedIn
                ? children
                : <Redirect to = "/"/>
            }
        </Route>
    );
};
