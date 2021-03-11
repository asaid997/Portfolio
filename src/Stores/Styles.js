import { makeStyles } from '@material-ui/core';

export class Styles {
    constructor() { 
        this.lightCyan = "#04c2c9";
        this.darkCyan = "#00a1a7";
        this.red = "#FF6B6B";
        this.black = "black";
        this.white = 'white';
        this.grey = '#f5f6fa';
        this.background = "#e8ecf1";
        this.font = 'Raleway, Arial';
    }

    barHeight = "5vh";
    barStyles = {
        useStyles: makeStyles(() => ({
            bar: {
                backgroundColor: this.white,
                color: this.black,
                "z-index": 1,
                minHeight: this.barHeight,
                height: this.barHeight
            },
            indicator: {
                backgroundColor: this.black,
            },
            tabRoot: {
              minHeight: this.barHeight,
              height: this.barHeight,
            }
        }))
    }
    homeStyles = {
        useStyles: makeStyles(() => ({
            intro: {
                fontSize: "6vmin",
            },
            mediumText: {
                fontSize: "4vmin"            
            },
            myImage: {
                "border-radius": "100vh",
                height: "20vh",
                "box-shadow": "2px 8px 8px grey",
            },
        }))
    }
    aboutSyles = {
        useStyles: makeStyles(() => ({
            aboutHead: {
                fontSize: "4vh",
                marginTop: "2vh"
            },
            aboutHeadBottom: {
                "border-top": `5px solid ${this.red}`,
                width: "15vh",
                height: "0px",
            },
            icon:{
                position: 'absolute',
                'justify-self': 'center',
                'align-self': 'center',
                zIndex: '2',
            },
        })),
    }

    progressStyle = {
        useStyles: makeStyles(() => ({
            container: {
                width: "80%",
                height: "6%",
                backgroundColor: this.grey,
                "border-radius": "2px",
                fontSize: "1.6vh",
                // fontFamily: this.font,
                position: "relative",
                "border-bottom-right-radius": "2px",
                "border-top-right-radius": "2px",
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