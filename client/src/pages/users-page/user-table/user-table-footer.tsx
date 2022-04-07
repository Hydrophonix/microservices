// Core
import { TableFooter, TablePagination, TableRow } from "@mui/material";
import { FC, MouseEvent, ChangeEvent }            from "react";
import { createStructuredSelector }               from "reselect";
import { useAppDispatch, useAppSelector, users }  from "../../../state";

export const UserTableFooter: FC = () => {
    const dispatch = useAppDispatch();
    const {
        count,
        page,
        limit,
    } = useAppSelector(createStructuredSelector({
        count: (state) => state.users.count,
        limit: (state) => state.users.limit,
        page:  (state) => state.users.page,
    }));


    const handleChangePage = (
        _event: MouseEvent<HTMLButtonElement> | null,
        page: number,
    ) => {
        dispatch(users.find({
            limit: limit,
            skip:  limit * page,
        }));
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(users.find({
            limit: parseInt(event.target.value, 10),
            skip:  0,
        }));
    };

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    SelectProps = {{
                        inputProps: {
                            "aria-label": "rows per page",
                        },
                        native:        true,
                        "data-testid": "UserTableFooter-select",
                    } as {}}
                    backIconButtonProps = {{
                        "data-testid": "UserTableFooter-prev-page",
                    } as {}}
                    colSpan = { 5 }
                    count = { count }
                    data-testid = "UserTableFooter-pagination"
                    nextIconButtonProps = {{
                        "data-testid": "UserTableFooter-next-page",
                    } as {}}
                    page = { page }
                    rowsPerPage = { limit }
                    rowsPerPageOptions = { [ 5, 10, 25, 50, 100 ] }
                    onPageChange = { handleChangePage }
                    onRowsPerPageChange = { handleChangeRowsPerPage }
                />
            </TableRow>
        </TableFooter>
    );
};
