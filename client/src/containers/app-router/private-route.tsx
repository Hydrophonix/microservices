// Core
import { FC, ReactNode }   from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector }  from "../../state";

interface PrivateRouteProps {
    path: string;
    children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children, path }) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    return (
        <Route
            exact
            path = { path }>
            {isLoggedIn
                ? children
                : <Redirect to = "/signin"/>
            }
        </Route>
    );
};
