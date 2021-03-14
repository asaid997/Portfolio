import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import '../../css-files/Mcard.css'
import { Grid } from '@material-ui/core';

export default function Mcard(props) {
  const {arr,i} = props;

  const syllabusHandler = () => arr[4] && window.open(arr[4], '_blank');

  return (
    <div className="card-container not-selectable" 
    style={{boxShadow: arr[3] ? `1px 1px 6px ${arr[3]}` : 'lightgrey'}}
    data-aos="my-flip-right" 
    data-aos-delay={`${i * 3 + 8}00`} 
    >
      <Card className={`card ${arr[2] === 'voice' ? 'in-progress' : {}}`}>
          <div className={arr[6] ? 'card-media-container-projects' : 'card-media-container' }>
            {arr[2] === 'voice' ? 
            <Grid container direction="row" justify="center" align="center" >
              <RecordVoiceOverIcon className="speaking-person"/> 
              <RecordVoiceOverIcon className="inverted speaking-person"/>
            </Grid>
            :
            <CardMedia
              className={arr[6] ? 'card-media-projects' : 'card-media' }
              component="img"
              alt="img"
              image={arr[2] ? arr[2] : 'sq.png'}
            />}
          </div>
          <div className="content-container center-text">
            <CardContent>
                <p className="font-bolder medium-text">
                  {arr[0]}
                </p>
              <p className="medium-text">
                {arr[1]}
              </p>
            </CardContent>
          </div>
          {arr[1] !== 'TBD' &&
          <div className="btn"
          style={{ background: arr[3] ? arr[3] : 'lightgrey', cursor: arr[4] ? 'pointer' : 'default'}} onClick={syllabusHandler} 
          fullwidth="true" size="small" color="primary">
              {arr[5]}
          </div>}           
      </Card>
    </div>
  );
}