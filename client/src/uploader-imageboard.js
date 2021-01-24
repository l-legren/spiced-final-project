import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addImageboardPicture, imageboardModalHidden } from "./actions";
import Grid from "@material-ui/core/Grid";
import instance from "./axios";
import { useEffect } from "react";

const UploaderImageboard = () => {
    const dispatch = useDispatch();
    const imageboardModal = useSelector(
        (state) => (state && state.imageboardModal) || false
    );
    const imageboardPics = useSelector(
        (state) => (state && state.imageboardPics) || []
    );

    const [picPreviewImageboard, setPicPreviewImageboard] = useState("");
    const [imageboardPic, setImageboardPic] = useState("");

    const handleClose = () => {
        dispatch(imageboardModalHidden(false));
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);

        reader.onloadend = () => {
            setPicPreviewImageboard(reader.result);
        };

        setImageboardPic(e.target.files[0]);
    };

    const handleUpload = () => {
        const fd = new FormData();
        fd.append("picture", imageboardPic);
        instance
            .post("/upload-imageboard/", fd)
            .then(({ data }) => {
                console.log("Data from db after uploading", data);
                dispatch(addImageboardPicture(data));
                dispatch(imageboardModalHidden(false));
                setPicPreviewImageboard("");
            })
            .catch((err) => console.log("Error requesting from Server: ", err));
    };

    return (
        <Dialog
            open={imageboardModal}
            onClose={handleClose}
            aria-labelledby="profile-pic-dialog"
        >
            <DialogTitle id="uploader-title">Upload Picture</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Pleae upload here your Profile Picture
                </DialogContentText>
                {picPreviewImageboard ? (
                    <>
                        <img
                            src={picPreviewImageboard}
                            alt="Pic Preview"
                            style={{ width: 40, height: 40 }}
                        />
                    </>
                ) : (
                    <>
                        <div style={{ width: 40, height: 40 }}></div>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <input
                    accept="image/*"
                    // className={classes.input}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleChange}
                />
                <label htmlFor="raised-button-file">
                    <Grid container spacing={1}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                component="span"
                                color="primary"
                                // className={classes.button}
                            >
                                Upload
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                onClick={handleUpload}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </label>
            </DialogActions>
        </Dialog>
    );
};

export default UploaderImageboard;
