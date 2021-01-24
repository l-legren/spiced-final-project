import { Button, Box } from "@material-ui/core";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageboardModalVisible, getOtherUserImageboard } from "./actions";

const OtherUserImageBoard = ({ props }) => {
    const dispatch = useDispatch();
    const otherUserImageboard = useSelector(
        (state) => (state && state.imageboardOtherUser) || []
    );

    useEffect(() => {
        console.log(props);
        dispatch(getOtherUserImageboard());
    }, []);

    return (
        <>
            <h1>IMAGEBOARD {props.match.params.id}</h1> 
            {/* <ImageList variant="masonry" cols={3} gap={8}>
                {otherUserImageboard.map((pic, idx) => {
                    return (
                        <ImageListItem key={idx}>
                            <img
                                srcSet={pic.url}
                                alt={`Image ${pic.id} of user ${pic.user_id}`}
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList> */}
        </>
    );
};

export default OtherUserImageBoard;
