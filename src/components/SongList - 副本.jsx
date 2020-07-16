import React from "react";
import ReactDOM from "react-dom";
import LangData from "../i18n/lang";
import {
    Button,
    //List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction as ListItemIcon,
    IconButton as Icon,
    Avatar,
    makeStyles,
    Tooltip,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/MusicNote";
import DeleteIcon from "@material-ui/icons/Delete";
import { dataManager } from "../apis/dataManager";
import prototypes from "prop-types";
import DeleteSong from "./DeleteSong";
import { FixedSizeList as List } from 'react-window';


var memory = {};

const handleDelete = (album, id, open, setOpen, ref, useMemory = false) => {
    if (!open && !useMemory) {
        setOpen(true);
        memory = { album, id, ref, setOpen };
        return undefined;
    }

    if (useMemory) {
        // eslint-disable-next-line
        var { album, id, ref, setOpen } = memory;
        var closeDialog = () => {
            handleDelete(null, null, false, setOpen, ref, true);
        };
        var dialog = (
            <DeleteSong
                open={open}
                close={() => {
                    setOpen(false);
                    closeDialog();
                    closeDialog = undefined; //释放内存，防止泄漏
                }}
                songID={id}
                albumID={album}
            />
        );
        ReactDOM.render(dialog, ref);
        return true;
    }
};

const useStyle = makeStyles((theme) => ({
    listItemStyle: {
        marginBottom: theme.spacing(1) * 0.5,
        borderBottom: "1px solid rgba(0,0,0,0.2)",
    },
    listStyles: {
        overflow: "auto",
    },
}));

function SongList(props) {
    const id = props.id;
    const songs = JSON.parse(dataManager.get(id));
    const styles = useStyle();
    const closeList = props.closeList;
    const [DeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    React.useEffect(() => {
        if (DeleteDialogOpen) {
            handleDelete(null, null, true, null, null, true);
        }
        return () => {};
    }, [DeleteDialogOpen]);
    
    const ListItemClick = React.useCallback(
                                function(){
                                    setTimeout(
                                        closeList, 
                                        800);
                                    }
                                ,
                                // eslint-disable-next-line
                                [closeList]
                            ) ;
    //width={500}
    //height={73} 
            
    const divDialogRef = React.useRef(null);
    const playList = React.useMemo(
        ()=>(   
            <List
                height={75}
                itemSize={73}
                itemCount={songs.length}
               className={styles.listStyles}>
                {songs.map((value, index) => (
                    <ListItem
                        key={index}
                        component={Button}
                        className={styles.listItemStyle}
                        onClick={
                            ListItemClick
                        }
                    >
                        <data style={{ display: "none" }} key={index}>
                            {value.id}
                        </data>

                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon></FolderIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={value.name}
                            secondary={value.singer + "," + value.album}
                        ></ListItemText>
                        <ListItemIcon>
                            <Tooltip title={LangData["PlayList"]["delete"]}>
                                <Icon
                                    edge={"end"}
                                    onClick={
                                        //React.useMemo(
                                        //()=>(
                                            () =>
                                                handleDelete(
                                                    id,
                                                    value.id,
                                                    DeleteDialogOpen,
                                                    setDeleteDialogOpen,
                                                    divDialogRef.current
                                                )
                                            //), 
                                        //    []
                                        //)
                                    }
                                >
                                    <DeleteIcon></DeleteIcon>
                                </Icon>
                            </Tooltip>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
        ), 
        //eslint-disable-next-line
        [songs, id]
    )
    return (
        <>
            <div ref={divDialogRef}></div>
            {playList}
        </>
    );
}
SongList.propTypes = {
    id: prototypes.oneOfType([prototypes.number, prototypes.string]),
    closeList: prototypes.func.isRequired,
};

export default SongList;
