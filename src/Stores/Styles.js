import { makeStyles, Tabs, withStyles } from '@material-ui/core';

export class Styles {
    constructor() { }

    barStyles = {
        useStyles: makeStyles(() => ({
            bar: {
                backgroundColor: 'white',
                color: 'black'
            },
        })),
        customTabs: () => withStyles({
            indicator: {
                backgroundColor: '#05386B',
            },
        })(Tabs)
    }
}