import React from "react";
import LangData from "../i18n/lang";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    InputBase,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import MenuOutlined from "@material-ui/icons/MenuOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import "./AppBar.css";
import { fade, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    inputRoot: {
        color: "white",
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        // padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        // pointerEvents: "none",
        //display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer !important",
        marginLeft: -1,
        marginTop: -5,
        zIndex: 200,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default () => {
    const styles = useStyle();
    const [ShowInput, setShowInput] = React.useState(false);
    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        aria-label="Menu"
                        onClick={() => {}}
                        color={"inherit"}
                        title={LangData["AppBar"]["menu"]}
                        className={styles.menuButton}
                    >
                        <MenuOutlined />
                    </IconButton>
                    <Typography variant="h6" className={styles.title}>
                        {LangData["AppBar"]["text"]}
                    </Typography>
                    <div
                        className={styles.search}
                        style={{
                            display: ShowInput ? "" : "none",
                        }}
                    >
                        <div className={styles.searchIcon}>
                            <IconButton color={"inherit"}>
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <InputBase
                            hidden={!ShowInput}
                            classes={{
                                root: styles.inputRoot,
                                input: styles.inputInput,
                            }}
                            placeholder={
                                LangData["AppBar"]["search_placeholder"]
                            }
                            inputProps={{
                                "aria-label": "search",
                                placeholder:
                                    LangData["AppBar"]["search_placeholder"],
                            }}
                        ></InputBase>
                    </div>
                    <IconButton
                        aria-label="Search"
                        onClick={() => {
                            setShowInput(!ShowInput);
                        }}
                        color={"inherit"}
                        title={LangData["AppBar"]["search"]}
                    >
                        {!ShowInput ? <SearchOutlined /> : <CloseIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
};
