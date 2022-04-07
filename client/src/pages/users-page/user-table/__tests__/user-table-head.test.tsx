// Test
import { render, screen, fireEvent } from "test/lib";

// Instruments
import { UserTableHead }     from "../user-table-head";
import * as hooks            from "../../../../state/hooks";
import { users }             from "../../../../state";
import { SortBy, SortOrder } from "../../../../state/domains/users/users.types";

describe("<UserTableHead />", () => {
    const dispatch = jest.fn();

    beforeEach(() => {
        jest.spyOn(hooks, "useAppDispatch").mockImplementation(() => dispatch);
        render(
            <table>
                <UserTableHead />
            </table>,
        );
    });

    test("should be rendered properly", () => {
        expect(screen.getByTestId("UserTableHead-#")).toBeInTheDocument();
        expect(screen.getByTestId("UserTableHead-role")).toBeInTheDocument();
        expect(screen.getByTestId("UserTableHead-username")).toBeInTheDocument();
        expect(screen.getByTestId("UserTableHead-email")).toBeInTheDocument();
        expect(screen.getByTestId("UserTableHead-actions")).toBeInTheDocument();
    });


    describe("click on label should dispatch action", () => {
        test("#", () => {
            const label = screen.getByTestId("UserTableHead-#");
            const action = users.find({
                sort:  SortBy.id,
                order: SortOrder.desc,
            });

            fireEvent.click(label);

            expect(dispatch).toBeCalledWith(action);
        });


        test("username", () => {
            const label = screen.getByTestId("UserTableHead-username");
            const action = users.find({
                sort:  SortBy.username,
                order: SortOrder.asc,
            });

            fireEvent.click(label);

            expect(dispatch).toBeCalledWith(action);
        });


        test("email", () => {
            const label = screen.getByTestId("UserTableHead-email");
            const action = users.find({
                sort:  SortBy.email,
                order: SortOrder.asc,
            });

            fireEvent.click(label);

            expect(dispatch).toBeCalledWith(action);
        });


        test("role", () => {
            const label = screen.getByTestId("UserTableHead-role");
            const action = users.find({
                sort:  SortBy.role,
                order: SortOrder.asc,
            });

            fireEvent.click(label);

            expect(dispatch).toBeCalledWith(action);
        });
    });
});
