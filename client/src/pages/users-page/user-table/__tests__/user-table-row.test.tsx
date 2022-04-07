// Test
import { render, screen, fireEvent } from "test/lib";
import { userStub }                  from "test/mocks";

// Instruments
import { UserTableRow } from "../user-table-row";

describe("<UserTableRow />", () => {
    const number = 1;
    const handleUserDelete = jest.fn();
    const handleUserEdit = jest.fn();

    beforeEach(() => {
        render(
            <table>
                <tbody>
                    <UserTableRow
                        handleUserDelete = { handleUserDelete }
                        handleUserEdit = { handleUserEdit }
                        number = { number }
                        user = { userStub }
                    />
                </tbody>
            </table>,
        );
    });


    test("should be rendered properly", () => {
        expect(screen.getByText(userStub.email)).toBeInTheDocument();
        expect(screen.getByText(userStub.role)).toBeInTheDocument();
        expect(screen.getByText(userStub.username)).toBeInTheDocument();
    });


    test("should handle click on Edit button", () => {
        const button = screen.getByTestId("UserTableRow-edit");

        fireEvent.click(button);

        expect(handleUserEdit).toBeCalledWith(userStub);
    });


    test("should handle click on Delete button", () => {
        const button = screen.getByTestId("UserTableRow-delete");

        fireEvent.click(button);

        expect(handleUserDelete).toBeCalledWith(userStub.id);
    });
});
