import { Grid } from '@material-ui/core'
import React from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import Title from './Helpers/Title';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailIcon from '@material-ui/icons/Mail';
import Icon from './Helpers/Icon';
import '../css-files/Contact.css'

export default function Projects() {

    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
            <Title title="Contact" color={true}/>
            <div id="contact-container" data-aos="my-slide-right" data-aos-delay="500" data-aos-duration="1000" >
                <div className="medium-text center"><LocationOnIcon className="cyan"/>Haifa, Northern District of Israel</div>
                <div className="medium-text center"><PhoneAndroidIcon className="cyan"/>+972-54-6777110</div>
                <div className="medium-text center"><MailIcon className="cyan"/>Androwas101@gmail.com</div>
                <div id="icons-container">
                    <Icon icon={<GitHubIcon style={{color: '#24292e'}} className="icon-c"/>} url='https://github.com/asaid997'/>
                    <Icon icon={<LinkedInIcon style={{color: '#0e76a8'}} className="icon-c"/>} url='https://www.linkedin.com/in/androw-said/'/>
                    <Icon icon={<FacebookIcon style={{color: '#3b5998'}} className="icon-c"/>} url='https://www.facebook.com/androw.said1'/>
                </div>
            </div>
        </Grid>
    )
}
