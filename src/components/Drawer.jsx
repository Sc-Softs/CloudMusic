import React from "react";
import {
    Drawer,
    ListItem,
    ListItemText,
    Button,
    ListItemAvatar,
    makeStyles,
} from "@material-ui/core";
import LangData from "../i18n/lang";
import HomeIcon from "@material-ui/icons/Home";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";

const DrawerData = [
    {
        Text: LangData["Drawer"]["Home"],
        Icon: HomeIcon,
        Link: "/index",
    },
    {
        Text: LangData["Drawer"]["Playing"],
        Icon: PlaylistPlayIcon,
        Link: "/playlist/default",
    },
];

const useStyle = makeStyles((theme) => ({
    DrawerItem: {
        minWidth: theme.spacing(25),
        // textAlign: "center",
        "& svg": {
            color: "gray",
        },
    },
}));

function ScDrawer(props) {
    const styles = useStyle();
    const { toggleDrawer, show } = props;
    //if (!show) return <></>;
    //else
    return (
        <>
            <Drawer variant={"temporary"} open={show} onClose={toggleDrawer}>
                {/* <ListItem>
                    <ListItemText>Hello</ListItemText>
                </ListItem> */}
                {DrawerData.map((value, index) => {
                    return (
                        <ListItem
                            className={styles.DrawerItem}
                            key={index}
                            component={Button}
                            onClick={() => {
                                window.location.href = "#" + value.Link;
                                toggleDrawer();
                            }}
                        >
                            <ListItemAvatar>
                                <value.Icon />
                            </ListItemAvatar>
                            <ListItemText>{value.Text}</ListItemText>
                        </ListItem>
                    );
                })}
            </Drawer>
        </>
    );
}

export default ScDrawer;
