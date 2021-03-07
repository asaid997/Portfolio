import { makeStyles } from '@material-ui/core';

export class Styles {
    constructor() { 
        this.lightCyan = "#04c2c9";
        this.darkCyan = "#00a1a7";
        this.black = "black";
        this.white = 'white';
        this.grey = '#f3f1ef';
        this.background = "#e8ecf1";
        this.font = 'Raleway, Arial';
    }

    barStyles = {
        useStyles: makeStyles(() => ({
            bar: {
                backgroundColor: this.white,
                color: this.black,
                fontStyle: 'normal',
                fontFamily: this.font,
                minHeight: "5vh",
                "z-index": 1,
            },
            indicator: {
                backgroundColor: this.black,
            },
        }))
    }
    homeStyles = {
        useStyles: makeStyles(() => ({
            intro: {
                fontSize: "6vmin",
            },
            mediumText: {
                fontSize: "4vmin",
            },
            myImage: {
                "border-radius": "100vh",
                height: "20vh",
                // "box-shadow": "2px 8px 8px grey",
            },
        }))
    }
    aboutSyles = {
        useStyles: makeStyles(() => ({
            aboutHead: {
                fontSize: "5vh",
                marginTop: "2vh"
            },
            aboutHeadBottom: {
                "border-top": `5px solid ${this.darkCyan}`,
                width: "15vh",
                height: "0px",
            },
        })),
    }

    progressStyle = {
        useStyles: makeStyles(() => ({
            container: {
                width: "80%",
                backgroundColor: this.grey,
                height: "2.5vh",
                "border-radius": "2px",
                fontSize: "1.6vh",
                fontFamily: this.font,
                position: "relative",
                "border-bottom-right-radius": "2px",
                "border-top-right-radius": "2px",
                marginTop: "1vh",
            },
            tag: {
                backgroundColor: this.lightCyan,
                width: "15%",
                color: this.white,
                height: "100%",
                "border-bottom-left-radius": "2px",
                "border-top-left-radius": "2px",
                float: 'left',
                
            },
            progress:{
                height: "100%",
                backgroundColor: this.darkCyan,
            },
            progressContainer:{
                height: "100%",
                float: 'left',
            },

            percent: {
                position: "absolute",
                float: 'left',
                right: "10px",
                color: "#666"
            },
            centerText: {
                justifyContent: "center",
                alignContent: "center",
                display: "grid"
            }
        }))
    }
}