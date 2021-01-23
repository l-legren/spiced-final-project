import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const UserImageBoard = () => {
    return (
        <ImageList variant="masonry" cols={3} gap={8}>
            <ImageListItem>
                <img src="/default.jpg"> </img>
            </ImageListItem>
            <ImageListItem>
                <img src="/default.jpg"> </img>
            </ImageListItem>
            <ImageListItem>
                <img src="/default.jpg"> </img>
            </ImageListItem>
        </ImageList>
    );
};

export default UserImageBoard;
