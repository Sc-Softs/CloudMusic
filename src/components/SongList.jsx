import React from "react";
import ReactDOM from "react-dom";
import LangData from "../i18n/lang";
import {
    Button,
    //List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemAvatar as ListItemIcon,
    IconButton as Icon,
    Avatar,
    makeStyles,
    Tooltip,
    useMediaQuery
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/MusicNote";
import DeleteIcon from "@material-ui/icons/Delete";
import { dataManager } from "../apis/dataManager";
import prototypes from "prop-types";
import DeleteSong from "./DeleteSong";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";


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
    const deviceShouldShowList = useMediaQuery("(min-width:600px)");
    const playList = React.useMemo(
        ()=>(
           <AutoSizer style={{height:deviceShouldShowList?'475px':'525px',width:deviceShouldShowList?'500px':'375px' }}>   
           {({height, width})=>{
                return (<List
                height={height}
                width={width}
                itemSize={74}
                itemCount={songs.length}
                innerElementType={"div"}
                style={
                    {
                        width:"100%"
                    }
                }
               >
                {function(input){
                    const {index, style} = input;
                     const value = songs[index];
                    return  (
                    <ListItem
                        key={index}
                        button
                        className={styles.listItemStyle}
                        onClick={
                            ListItemClick
                        }
                        style={
                          style
                        }
                    >
                        

                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon></FolderIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={value.name}
                            secondary={value.singer + "," + value.album}
                        ></ListItemText>
                        <ListItemIcon style={{minWidth:48}}>
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
                );
                }
                }
            </List>);
            }
            }
            </AutoSizer>
            )
        , 
        //eslint-disable-next-line
        [songs, id]
    );
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