// Core
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { FC, MouseEvent }                                 from "react";
import { createStructuredSelector }                       from "reselect";

// State
import { useAppDispatch, useAppSelector, users } from "../../../state";

// Instruments
import { SortBy, SortOrder } from "../../../state/domains/users/users.types";

export const UserTableHead: FC = () => {
    const dispatch = useAppDispatch();
    const {
        sort,
        order,
    } = useAppSelector(createStructuredSelector({
        sort:  (state) => state.users.sort,
        order: (state) => state.users.order,
    }));


    const handleFindUsers = (field: SortBy) => (event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();

        const sameFieldSortOrder = order === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
        const sortOrder = field === sort ? sameFieldSortOrder : SortOrder.asc;

        dispatch(users.find({
            sort:  field,
            order: sortOrder,
        }));
    };


    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <TableSortLabel
                        active = { sort === SortBy.id }
                        data-testid = "UserTableHead-#"
                        direction = { order }
                        onClick = { handleFindUsers(SortBy.id) }>
                        #
                    </TableSortLabel>
                </TableCell>

                <TableCell>
                    <TableSortLabel
                        active = { sort === SortBy.username }
                        data-testid = "UserTableHead-username"
                        direction = { order }
                        onClick = { handleFindUsers(SortBy.username) }>
                        Username
                    </TableSortLabel>
                </TableCell>

                <TableCell>
                    <TableSortLabel
                        active = { sort === SortBy.role }
                        data-testid = "UserTableHead-role"
                        direction = { order }
                        onClick = { handleFindUsers(SortBy.role) }>
                        Role
                    </TableSortLabel>
                </TableCell>

                <TableCell>
                    <TableSortLabel
                        active = { sort === SortBy.email }
                        data-testid = "UserTableHead-email"
                        direction = { order }
                        onClick = { handleFindUsers(SortBy.email) }>
                        Email
                    </TableSortLabel>
                </TableCell>

                <TableCell
                    align = "center"
                    data-testid = "UserTableHead-actions">
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
