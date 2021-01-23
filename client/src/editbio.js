import { Typography, Button, Grid, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import instance from "./axios";
import { getUserInfo, addBio } from "./actions";

const EditBio = () => {
    const dispatch = useDispatch();
    const profileInfo = useSelector((state) => (state && state.userInfo) || {});

    const [bio, setBio] = useState("");
    const [editVisibility, setEditVisibility] = useState(false);

    const uploadBio = () => {
        setEditVisibility(false);
        instance
            .post("/update-bio", {
                bio: bio,
            })
            .then(({ data }) => {
                console.log("Got response from server", data[0]);
                dispatch(addBio(data[0].bio));
            })
            .catch((err) => console.log("Error sending bio:", err));
    };

    const myTextField = (
        <TextField
            defaultValue={bio ? bio : ""}
            multiline
            rows={2}
            rowsMax={4}
            onChange={(e) => setBio(e.target.value)}
        />
    );

    return (
        <>
            <Typography variant="h3" color="initial">
                {profileInfo.first} {profileInfo.last}
            </Typography>
            {profileInfo.bio ? (
                <>
                    <Typography variant="subtitle1" color="initial">
                        {profileInfo.bio}
                    </Typography>
                    {editVisibility && (
                        <>
                            {myTextField}
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={uploadBio}
                            >
                                SAVE BIO
                            </Button>
                        </>
                    )}
                    {!editVisibility && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setEditVisibility(true)}
                        >
                            EDIT BIO
                        </Button>
                    )}
                </>
            ) : (
                <>
                    {editVisibility ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {myTextField}
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={uploadBio}
                            >
                                SAVE BIO
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setEditVisibility(true)}
                        >
                            ADD BIO
                        </Button>
                    )}
                </>
            )}
        </>
    );
};

export default EditBio;
