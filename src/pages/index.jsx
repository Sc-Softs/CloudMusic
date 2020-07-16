import React from "react";
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    makeStyles,
    Typography,
    Button,
} from "@material-ui/core";
import LangData from "../i18n/lang";
import { useHistory } from "react-router-dom";

//PlayList
var data = [
    {
        name: "测试歌单",
        singer: "歌手",
        pic:
            "http://p2.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg",
        id: 100,
    },
];

const useStyles = makeStyles((theme) => ({
    rootDiv: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        width: "calc( 100% - 16px )", //Fix div size (avoiding scrollbar)
    },
    root: {
        maxWidth: 350,
        display: "flex",
        margin: theme.spacing(2),
    },
}));

/**
 * @param {number} id
 * @param {History<{}>} history
 */
const handleClick = (id, history) => {
    history.push("/playlist/" + id);
};

export default () => {
    const styles = useStyles();
    const history = useHistory();
    const cardsActionCallBack =  React.useCallback(
        function (value){
            handleClick(value.id,history);
        },// eslint-disable-next-line
        []
    );
    return (
        <Grid className={styles.rootDiv} container spacing={2}>
            {data.map((value, index) => {
                return (
                    <Card className={styles.root} key={index}>
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <CardContent
                                style={{
                                    flex: "1 0 auto",
                                    // display: "flex",
                                    minWidth: 175,
                                    minHeight: 85,
                                    maxWidth: 200,
                                    maxHeight: 85,
                                }}
                            >
                                <div>
                                    <Typography
                                        gutterBottom
                                        variant={"h5"}
                                        component={"h2"}
                                    >
                                        {value.name}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        color="textSecondary"
                                        variant={"body2"}
                                        component={"p"}
                                    >
                                        {value.singer}
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardActions
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: 16,
                                    paddingBottom: 16,
                                }}
                            >
                                <Button
                                    variant={"text"}
                                    onClick={
                                       cardsActionCallBack.bind(this,
                                        value)
                                    }
                                >
                                    {LangData["Index"]["openAlbum"]}
                                </Button>
                            </CardActions>
                        </div>
                        <CardMedia
                            image={value.pic}
                            style={{
                                width: "150px",
                            }}
                        ></CardMedia>
                    </Card>
                );
            })}
        </Grid>
    );
};
