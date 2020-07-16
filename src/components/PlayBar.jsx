import React from "react";
import { Paper, makeStyles, Fab } from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import Audio from "./Audio.jsx";

const useStyle = makeStyles((theme) => ({
    rootPaper: {
        position: "relative",
        width: "calc( 100% - 8px )",
        height: "calc( 100% - 8px )",
        boxShadow: "4px 4px 14px -5px #000",
        padding: "4px",
    },
    fabPlay: {
        marginTop: 2,
        "& svg": {
            fontSize: 62,
        },
        "& .MuiTouchRipple-root": {
            color: "black",
        },
    },
}));

export default (props) => {
    const styles = useStyle();
    const [Playing, setPlaying] = props.playState;
    const [Src, setSrc] = props.srcState;
    return (
        <>
            <Audio play={Playing} src={Src} setPlaying={setPlaying} />
            <Paper variant={"outlined"} className={styles.rootPaper}>
                <Fab
                    color={"secondary"}
                    variant={"round"}
                    className={styles.fabPlay}
                    onClick={() => {
                        setPlaying(!Playing);
                    }}
                    disabled={Src === ""}
                >
                    {!Playing ? <PlayIcon /> : <PauseIcon />}
                </Fab>
            </Paper>
        </>
    );
};
