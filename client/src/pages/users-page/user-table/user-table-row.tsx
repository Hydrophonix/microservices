// Core
import { IconButton, TableCell, TableRow } from "@mui/material";
import { Edit, Delete }                    from "@mui/icons-material";
import { FC }                              from "react";

// Instruments
import { User } from "../../../state/domains/auth/auth.types";

export interface UserTableRowProps {
    number: number;
    user: User;
    handleUserDelete: (userId: string) => void;
    handleUserEdit: (user: User) => void;
}

export const UserTableRow: FC<UserTableRowProps> = ({
    number,
    user,
    handleUserDelete,
    handleUserEdit,
}) => {
    return (
        <TableRow>
            <TableCell>{number}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
                <IconButton
                    data-testid = "UserTableRow-edit"
                    onClick = { () => handleUserEdit(user) }>
                    <Edit color = "primary"/>
                </IconButton>

                <IconButton
                    data-testid = "UserTableRow-delete"
                    onClick = { () => handleUserDelete(user.id) }>
                    <Delete color = "error"/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};
