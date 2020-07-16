import React from "react";
import { dataManager } from "../apis/dataManager";
import LangData from "../i18n/lang";
import { Box, useMediaQuery, makeStyles, Fab } from "@material-ui/core";
import SongList from "../components/SongList";
import AddIcon from "@material-ui/icons/List";
import PlayBar from "../components/PlayBar";

const useStyles = makeStyles((theme) => ({
    listBox: {
        width: 500,
        boxShadow: "-1px 8px 18px -10px #000",
        marginLeft: theme.spacing(1),
        maxHeight: "calc( 100% - 64px - 105px)",
        overflow: "auto",
        marginTop: theme.spacing(1) * 0.5,
        position: "fixed",
        "& li": {
            display: "block",
        },
    },
    fab: {
        margin: theme.spacing(2),
    },
    playBarStyle: {
        position: "absolute",
        bottom: 8,
        left: 8,
        right: 8,
        height: 75,
    },
}));

/**
 *
 * @param {string} id
 */
const isDefault = (id) => id === "default";

/**
 * @param {import("react-router-dom").RouteComponentProps} props
 */
export default (props) => {
    const id = props.match.params.id;
    const styles = useStyles();
    if (!isDefault(id) && !dataManager.exist(id)) {
        return <h1>{LangData["PlayList"]["illegal"]}</h1>;
    }
    const deviceShouldShowList = useMediaQuery("(min-width:600px)");
    const [ShouldShowList, setShouldShowList] = React.useState(true);

    React.useEffect(() => {
        setShouldShowList(deviceShouldShowList);
    }, [deviceShouldShowList]);
    const listStyle = {
        display: ShouldShowList ? "" : "none",
        width: deviceShouldShowList ? undefined : 375,
    };
    const fabClick = React.useMemo(
        () => () => setShouldShowList(!ShouldShowList),
        [ShouldShowList]
    );
    const closeList = React.useMemo(
        () => () => !deviceShouldShowList && setShouldShowList(!ShouldShowList),
        [deviceShouldShowList, ShouldShowList]
    );
    const fabStyle = React.useMemo(
        () => ({ display: !ShouldShowList ? "" : "none" }),
        [ShouldShowList]
    );

    var playState = React.useState(false);
    var srcState = React.useState("");

    return (
        <>
            <Fab
                style={fabStyle}
                color={"secondary"}
                onClick={fabClick}
                className={styles.fab}
                size={"small"}
            >
                <AddIcon />
            </Fab>
            <Box style={listStyle} className={styles.listBox}>
                <SongList
                    id={id}
                    closeList={closeList}
                    srcState={srcState}
                    playState={playState}
                ></SongList>
            </Box>
            <Box className={styles.playBarStyle}>
                <PlayBar playState={playState} srcState={srcState} />
            </Box>
        </>
    );
};

if (!dataManager.exist("default")) {
    dataManager.set("default", JSON.stringify([]));
}
