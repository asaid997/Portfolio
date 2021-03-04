import React,{useState} from 'react'
import { inject, observer } from 'mobx-react';
import { Fab, Hidden, List, SwipeableDrawer} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from './MenuItem';


function MenuAction(props) {
    const { sections, styles } = props;
    const { meanuActionStyle } = styles;

    const [bottom, setBottom] = useState(false);
    const anchor = 'bottom';
  
    const toggleDrawer = open => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) 
        return;
      setBottom(open);
    };
    const classes = meanuActionStyle.useStyles();

    return (
        <Hidden smUp>
        <Fab className={classes["menue-action-btn"]} color="primary" aria-label="add" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Fab>
        <SwipeableDrawer
          anchor={anchor}
          open={bottom}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
              <List>
                {sections.map((text, index) => (
                    <MenuItem index={index} text={text} key={text}/>
                ))}
              </List>
          </div>
        </SwipeableDrawer>
      </Hidden>
    )
}

export default inject("styles")(observer(MenuAction));
