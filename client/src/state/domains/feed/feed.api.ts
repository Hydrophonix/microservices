// Instruments
import { axiosClient } from "../../axios-client";
import { Feed }        from "./feed.types";

export const feedAPI = Object.freeze({
    getOne: (id?: string) => axiosClient
        .get<Feed>(`/feed/${id}`),
});
