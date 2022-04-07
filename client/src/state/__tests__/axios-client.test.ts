// Core
import axios, { AxiosInstance } from "axios";

describe("axios client", () => {
    const createMock = jest.fn().mockReturnValue("client");
    let client: AxiosInstance;

    beforeEach(async () => {
        jest.spyOn(axios, "create").mockImplementation(createMock);

        const { axiosClient } = await import("../axios-client");

        client = axiosClient;
    });


    test("should call axios.create with options", () => {
        expect(createMock).toHaveBeenCalledWith({
            baseURL:         "http://localhost:3000/api",
            timeout:         2000,
            withCredentials: true,
        });
    });


    test("should be", () => {
        expect(client).toBe("client");
    });
});
