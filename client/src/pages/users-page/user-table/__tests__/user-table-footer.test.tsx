// Core
// Test
import { render, screen, fireEvent, TestRootState } from "test/lib";
import { userStub }                                 from "test/mocks";

// Instruments
import { UserTableFooter }   from "../user-table-footer";
import * as hooks            from "../../../../state/hooks";
import { users }             from "../../../../state";
import { SortBy, SortOrder } from "../../../../state/domains/users/users.types";

describe("<UserTableFooter />", () => {
    const dispatch = jest.fn();
    const preloadedState: TestRootState = {
        users: {
            count:     100,
            isLoading: false,
            limit:     10,
            list:      [],
            order:     SortOrder.asc,
            edit:      null,
            page:      3,
            skip:      10,
            sort:      SortBy.id,
        },
    };

    beforeEach(() => {
        jest.spyOn(hooks, "useAppDispatch").mockImplementation(() => dispatch);
        render(
            <table>
                <UserTableFooter />
            </table>,
            preloadedState,
        );
    });


    test("should be rendered properly", () => {
        expect(screen.getByTestId("UserTableFooter-next-page")).toBeInTheDocument();
        expect(screen.getByTestId("UserTableFooter-prev-page")).toBeInTheDocument();
        expect(screen.getByTestId("UserTableFooter-select")).toBeInTheDocument();
        expect(screen.getByTestId("UserTableFooter-pagination")).toBeInTheDocument();
    });


    test("should handle onClick on next page button", () => {
        const button = screen.getByTestId("UserTableFooter-next-page");
        const action = users.find({
            limit: preloadedState.users!.limit,
            skip:  preloadedState.users!.limit * 4,
        });

        fireEvent.click(button);

        expect(dispatch).toBeCalledWith(action);
    });


    test("should handle onClick on prev page button", () => {
        const button = screen.getByTestId("UserTableFooter-prev-page");
        const action = users.find({
            limit: preloadedState.users!.limit,
            skip:  preloadedState.users!.limit * 2,
        });

        fireEvent.click(button);

        expect(dispatch).toBeCalledWith(action);
    });
});
