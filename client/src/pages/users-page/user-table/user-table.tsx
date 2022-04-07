// Core
import { FC, useEffect }            from "react";
import { Table, TableBody }         from "@mui/material";
import { createStructuredSelector } from "reselect";
import { push }                     from "connected-react-router";

// Components
import { BackdropContainer } from "../../../components";
import { UserTableHead }     from "./user-table-head";
import { UserTableRow }      from "./user-table-row";
import { UserTableFooter }   from "./user-table-footer";

// State
import { useAppDispatch, useAppSelector, users } from "../../../state";

// Instruments
import { User }      from "../../../state/domains/users/users.types";
import { RootState } from "../../../state/store";

export const UserTable: FC = () => {
    const dispatch = useAppDispatch();
    const {
        list,
        isLoading,
        skip,
    } = useAppSelector(createStructuredSelector({
        list:      (state: RootState) => state.users.list,
        isLoading: (state) => state.users.isLoading,
        skip:      (state) => state.users.skip,
    }));

    useEffect(() => {
        dispatch(users.find());
    }, [ dispatch ]);


    const handleUserDelete = (userId: string) => {
        dispatch(users.delete(userId));
    };

    const handleRedirectToUserEditPage = (user: User) => {
        dispatch(push(`/users/${user.id}`, user));
    };


    return (
        <BackdropContainer open = { isLoading }>
            <Table sx = {{  width: 800 }}>
                <UserTableHead />

                <TableBody>
                    {list.map((user, i) => (
                        <UserTableRow
                            handleUserDelete = { handleUserDelete }
                            handleUserEdit = { handleRedirectToUserEditPage }
                            key = { user.id }
                            number = { skip + i + 1 }
                            user = { user }
                        />
                    ))}
                </TableBody>

                <UserTableFooter />
            </Table>
        </BackdropContainer>
    );
};
