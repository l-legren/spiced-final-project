import { TextField, Box } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMessagesWithUser } from "./actions";

const ChatLayout = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getMessagesWithUser());
    }, []);

    return (
        <>
            <Box>
                <h1>Holla</h1>
                <TextField
                    defaultValue=""
                    multiline
                    rows={2}
                    rowsMax={4}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Box>
        </>
    );
};

export default ChatLayout;
