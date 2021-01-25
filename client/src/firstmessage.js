import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { modalFirstMessage } from "./actions";
import { useEffect } from "react";

export default function FirstMessageDialog() {
    const firstMessage = useSelector(
        (state) => (state && state.modalFirstMessage) || false
    );
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(modalFirstMessage(false));
    };

    const handleSubmit = () => {
        console.log("submit button works");
    };

    return (
        <div>
            <Dialog
                open={firstMessage}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">photoMe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Send your first message to user
                    </DialogContentText>
                    <TextField autoFocus variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleSubmit}>Contact me!</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
