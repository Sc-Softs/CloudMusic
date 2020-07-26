import React from "react";
import {Fab, makeStyles, Paper, Slider, Typography} from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PubSub from "pubsub-js";
import {MESSAGE_SET_PROGRESS} from "./Audio";

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
    Separator: {
        width: theme.spacing(1),
        display: "inline-block"
    }
}));

const Separator = (props) => <div className={props.class.Separator}/>;

const useRangeStyles = makeStyles(
    {
        root: {
            marginLeft: '25px',
            width: '80%',
            display: 'inline-block',
            position: 'absolute',
            top: 20
        }
    }
);

const RangeSlider =
    (props) => {
        const styles = useRangeStyles();
        const {min, max, value, onChange, disabled} = props;
        return (
            <div className={styles.root}>
                <Typography>

                </Typography>
                <Slider
                    valueLabelDisplay={"auto"}
                    min={min}
                    max={max}
                    onChange={
                        onChange
                    }
                    step={0.1}
                    value={value}
                    valueLabelFormat={(v) => `${v}%`}
                    disabled={disabled}

                />
            </div>);
    };

export default (props) => {
    const styles = useStyle();
    const [Playing, setPlaying] = props.playState;
    const [SRC,] = props.srcState;
    const [CurrentTime, /*setCurrentTime*/] = props.currentTimeState;
    const [TotalTime] = props.totalTimeState;
    const Value = Math.floor((CurrentTime / TotalTime) * 1000) / 10;
    return (
        <>

            <Paper variant={"outlined"} className={styles.rootPaper}>
                <Fab
                    color="primary"
                    size={"small"}
                    disabled={SRC === ""}
                >
                    {<SkipPreviousIcon/>}
                </Fab>
                <Separator class={styles}/>
                <Fab
                    color={"secondary"}
                    variant={"round"}
                    className={styles.fabPlay}
                    onClick={() => {
                        setPlaying(!Playing);
                    }}
                    disabled={SRC === ""}
                >
                    {!Playing ? <PlayIcon/> : <PauseIcon/>}
                </Fab>
                <Separator class={styles}/>
                <Fab
                    color="primary"
                    size={"small"}
                    disabled={SRC === ""}
                >
                    {<SkipNextIcon/>}
                </Fab>
                <Separator
                    class={styles}

                />
                <RangeSlider
                    min={0}
                    max={100}
                    value={Value}
                    onChange={(e, newValue) => {
                        //setCurrentTime(TotalTime * newValue / 100);
                        const currentTime = TotalTime * newValue / 100;
                        PubSub.publish(MESSAGE_SET_PROGRESS,currentTime);
                    }}
                    disabled={SRC === ""}
                />
            </Paper>
        </>
    );
};
