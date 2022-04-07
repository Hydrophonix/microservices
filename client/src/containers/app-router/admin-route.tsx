// Core
import { FC, ReactNode }   from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector }  from "../../state";

interface AdminRouteProps {
    path: string;
    children: ReactNode;
}

export const AdminRoute: FC<AdminRouteProps> = ({ children, path }) => {
    const { currentUser, isLoggedIn } = useAppSelector((state) => state.auth);

    if (!isLoggedIn) {
        return (
            <Redirect to = "/signin"/>
        );
    }

    if (currentUser?.role !== "admin") {
        return (
            <Redirect to = "/not-found"/>
        );
    }

    return (
        <Route
            exact
            path = { path }>
            {children}
        </Route>
    );
};
