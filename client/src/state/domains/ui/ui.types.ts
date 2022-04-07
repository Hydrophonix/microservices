export type OpenConfirmationalModalPayload = {
    title: string;
    content: string;
};

export type UIState = {
    isMenuOpen:      boolean;
    confirmationModal: {
        open: boolean;
    } & OpenConfirmationalModalPayload;
};

export type FetchTodoPayload = {
    skip: number;
    take: number;
};
