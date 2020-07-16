import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@material-ui/core";
import LangData from "../i18n/lang";
import { delSong } from "../apis/song";

const ActionButton = (props) => {
    return <Button variant={"text"} {...props} />;
};

/**
 *
 * @returns {void}
 * @param {function} close
 * @param {string|number} songID
 * @param {string|number} albumID
 */
function handleDelete(close, songID, albumID) {
    delSong(albumID, songID);
    close();
}

function DeleteSong(props) {
    const { songID, albumID, open, close } = props;
    return (
        <>
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {LangData["Delete"]["Title"]}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id={"alert-dialog-description"}>
                        {LangData["Delete"]["description"]}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ActionButton
                        onClick={() => handleDelete(close, songID, albumID)}
                    >
                        {LangData["Delete"]["agree"]}
                    </ActionButton>
                    <ActionButton onClick={close}>
                        {LangData["Delete"]["cancel"]}
                    </ActionButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

DeleteSong.propTypes = {
    songID: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    albumID: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
};

export default DeleteSong;
