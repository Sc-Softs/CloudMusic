import React from "react";
import { Paper, makeStyles, Fab } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import Audio from './Audio.jsx';

const useStyle = makeStyles((theme) => ({
    rootPaper: {
        position: "relative",
        width: "calc( 100% - 8px )",
        height: "calc( 100% - 8px )",
        boxShadow: "4px 4px 14px -5px #000",
        padding: "4px",
    },
    fab: {
        "& svg": {
            fontSize: 62,
        },
        "& .MuiTouchRipple-root": {
            color: "black",
        },
    },
}));

export default () => {
    const styles = useStyle();
    const [Playing, setPlaying] = React.useState(false);
    const [Src, setSrc] = React.useState("");
    return (
        <>
            <Audio play={Playing} src={Src} setPlaying={setPlaying}/>
            <Paper variant={"outlined"} className={styles.rootPaper}>
                <Fab
                    color={"secondary"}
                    variant={"round"}
                    className={styles.fab}
                    onClick={() => {
                        setSrc("https://music.163.com/song/media/outer/url?id=569200213.mp3");
                        setPlaying(!Playing);
                    }}
                >
                    {!Playing ? <PlayIcon /> : <PauseIcon />}
                </Fab>
            </Paper>
        </>
    );
};
