import { makeStyles, Tabs, withStyles } from '@material-ui/core';

export class Styles {
    constructor() { 
        this.lightCyan = "#04c2c9";
        this.darkCyan = "#03878C";
        this.black = "black";
        this.white = 'white';
        this.background = "#e8ecf1"
    }

    barStyles = {
        useStyles: makeStyles(() => ({
            bar: {
                backgroundColor: this.white,
                color: this.black,
                fontStyle: 'normal',
                fontFamily: 'Raleway, Arial',
            },
        })),
        customTabs: () => withStyles({
            indicator: {
                backgroundColor: this.black,
            },
        })(Tabs)
    }

    homeStyles = {
        
    }
    aboutSyles = {
        useStyles: makeStyles(() => ({
            "about-head": {
                borderBottom: "6px solid #05386B",
                fontSize: "5vh"
            }
        })),
    }

    meanuActionStyle = {
        useStyles: makeStyles(theme => ({
            "menue-action-btn": {
            position: "fixed",
            backgroundColor: "#04C1C8",
            right: "10px",
            bottom: "10px",
            width: "9vh",
            height: "9vh",
            // animation: "1s ease-out 0s 1 $slideInFromRight",
            animation: `$slideInFromRight 1000ms ${theme.transitions.easing.easeInOut}`
            },
            "@keyframes slideInFromRight": {
                "0%": {
                  transform: "translateX(+100%)"
                },
                "100%": {
                  transform: "translateX(0)"
                }
            }
        }))
    }
}