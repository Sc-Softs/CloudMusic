import React from "react";
import AppBar from "./components/AppBar.jsx";
import LangData from "./i18n/lang";
import Router from "./components/Router.jsx";
import Index from "./pages/index.jsx";
import Search from "./pages/search.jsx";
import PlayList from "./pages/playlist.jsx";
import Drawer from "./components/Drawer";

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
    const toggleDrawer = React.useMemo(()=>(
            ()=>setShowDrawer(!ShowDrawer)
        ), [ShowDrawer]);
    return (
        <>
            <Drawer
                show={ShowDrawer}
                toggleDrawer={toggleDrawer}
            ></Drawer>
            <AppBar toggleDrawer={toggleDrawer}></AppBar>
            <Router route={router} redirect={redirect}></Router>
        </>
    );
};
document.title = LangData["App"]["title"];
