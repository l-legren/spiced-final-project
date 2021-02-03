import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import instance from "./axios";
import { modalFirstMessage } from "./actions";

export default function FirstMessageDialog({ props }) {
    const [firstMessage, setFirstMessage] = useState("");

    const modalFirstMessageState = useSelector(
        (state) => (state && state.modalFirstMessage) || false
    );
    // const userFirstMessage = useSelector(
    //     (state) => (state && state.firstMessage) || ""
    // );
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(modalFirstMessage(false));
    };

    const handleSubmit = () => {
        instance
            .post("/add-first-message", {
                msg: firstMessage,
                user_id: props.match.params.id,
            })
            .then(() => {
                location.replace("/messages");
            });
    };

    return (
        <div>
            <Dialog
                open={modalFirstMessageState}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">photoMe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Send your first message to user
                    </DialogContentText>
                    <TextField
                        autoFocus
                        variant="outlined"
                        onChange={(e) => setFirstMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Contact me!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
