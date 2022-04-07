// Core
import { FC }      from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

// Components
import { Transition } from "./transition";

// State
import { ui, useAppDispatch, useAppSelector } from "../../state";

export const ConfirmationModal: FC = () => {
    const dispatch = useAppDispatch();
    const { open, title, content } = useAppSelector((state) => state.ui.confirmationModal);

    const handleConfirm = () => dispatch(ui.modalConfirm());
    const handleCancel = () => dispatch(ui.modalCancel());

    return (
        <Dialog
            keepMounted
            TransitionComponent = { Transition }
            aria-describedby = "alert-dialog-slide-description"
            open = { open }
            onClose = { handleCancel }>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id = "alert-dialog-slide-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick = { handleCancel }>Cancel</Button>
                <Button onClick = { handleConfirm }>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};
