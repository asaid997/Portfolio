import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import '../../css-files/Mcard.css'
import { Button } from '@material-ui/core';

export default function Mcard(props) {
  const {arr,i} = props;

  const syllabusHandler = () => window.open(arr[4], '_blank');

  return (
    <div className="card-container not-selectable" 
    style={{boxShadow: arr[3] ? `1px 1px 6px ${arr[3]}` : 'lightgrey'}}
    data-aos="my-flip-right" data-aos-delay={`${i * 2}00`} data-aos-duration="1000">
      <Card className="card">
          <div className="card-media-container">
            <CardMedia
              className="card-media"
              component="img"
              alt="img"
              image={arr[2] ? arr[2] : 'sq.png'}
              title="Education"
            />
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
          {arr[1] != 'TBD' &&
          <div className="syllabus"
          style={{ background: arr[3] ? arr[3] : 'lightgrey' }} onClick={syllabusHandler} 
          fullWidth={true} size="small" color="primary">
              <span>{arr[5]}</span>
          </div>}           
      </Card>
    </div>
  );
}