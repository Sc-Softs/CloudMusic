import React from "react";
import AppBar from "./components/AppBar.jsx";
import LangData from "./i18n/lang";
import Router from "./components/Router.jsx";
import Index from "./pages/index.jsx";
import Search from "./pages/search.jsx";

const router = [
    {
        path: "/search",
        component: Search,
    },
    {
        path: "/index",
        component: Index,
    },
];

const redirect = {
    from: "/",
    to: "/index",
};

export default () => {
    return (
        <>
            <AppBar></AppBar>
            <Router route={router} redirect={redirect}></Router>
        </>
    );
};
document.title = LangData["App"]["title"];
