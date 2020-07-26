import React from "react";
import AppBar from "./components/AppBar.jsx";
import LangData from "./i18n/lang";
import Router from "./components/Router.jsx";
import Index from "./pages/index.jsx";
import Search from "./pages/search.jsx";
import PlayList from "./pages/playlist.jsx";
import Drawer from "./components/Drawer.jsx";
import Audio from "./components/Audio.jsx";
import {createPlayList} from "./apis/song";

const router = [
    {
        path: "/search",
        component: Search,
    },
    {
        path: "/index",
        component: Index,
    },
    {
        path: "/playlist/:id",
        component: PlayList,
    },
];

const redirect = {
    from: "/",
    to: "/index",
};

export default () => {
    const [ShowDrawer, setShowDrawer] = React.useState(false);
    var playState, srcState, currentTimeState, totalTimeState;
    var [Playing, setPlaying] = (playState = React.useState(false));
    var [SRC] = (srcState = React.useState(""));

    currentTimeState = React.useState(0);
    totalTimeState = React.useState(0);

    const toggleDrawer = React.useMemo(() => () => setShowDrawer(!ShowDrawer), [
        ShowDrawer,
    ]);
    return (
        <>
            <Audio
                play={Playing}
                src={SRC}
                setPlaying={setPlaying}
                currentState={currentTimeState}
                totalState={totalTimeState}
            />
            <Drawer show={ShowDrawer} toggleDrawer={toggleDrawer}/>
            <AppBar toggleDrawer={toggleDrawer}/>
            <Router
                route={router}
                redirect={redirect}
                data={
                    {
                        playState,
                        srcState,
                        currentTimeState,
                        totalTimeState
                    }
                }
            />
        </>
    );
};

createPlayList("default");
document.title = LangData["App"]["title"];
