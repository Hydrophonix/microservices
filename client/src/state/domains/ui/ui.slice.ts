// Core
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import {
    UIState,
    OpenConfirmationalModalPayload,
} from "./ui.types";

const initialState: UIState = {
    isMenuOpen:        false,
    confirmationModal: {
        open:    false,
        title:   "",
        content: "",
    },
};

export const { actions: ui, reducer: uiReducer } = createSlice({
    name:     "ui",
    initialState,
    reducers: {
        openMenu(state) {
            state.isMenuOpen = true;
        },
        closeMenu(state) {
            state.isMenuOpen = false;
        },
        openConfirmationalModal(state, { payload }: PayloadAction<OpenConfirmationalModalPayload>) {
            state.confirmationModal.open = true;
            state.confirmationModal.title = payload.title;
            state.confirmationModal.content = payload.content;
        },
        modalConfirm(state) {
            state.confirmationModal.open = false;
            state.confirmationModal.title = "";
            state.confirmationModal.content = "";
        },
        modalCancel(state) {
            state.confirmationModal.open = false;
            state.confirmationModal.title = "";
            state.confirmationModal.content = "";
        },
    },
});
