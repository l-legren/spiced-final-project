import { Button } from "@material-ui/core";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useDispatch, useSelector } from "react-redux";
import { imageboardModalVisible } from "./actions";
import UploaderImageboard from "./uploader-imageboard";

const UserImageBoard = () => {
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        dispatch(imageboardModalVisible());
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                UPLOAD IMAGE
            </Button>
            <UploaderImageboard />
            <ImageList variant="masonry" cols={3} gap={8}>
                <ImageListItem>
                    <img src="/default.jpg" />
                </ImageListItem>
                <ImageListItem>
                    <img src="/default.jpg" />
                </ImageListItem>
                <ImageListItem>
                    <img src="/default.jpg" />
                </ImageListItem>
            </ImageList>
        </>
    );
};

export default UserImageBoard;
