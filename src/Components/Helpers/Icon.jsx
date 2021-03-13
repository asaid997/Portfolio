import React from 'react'
import '../../css-files/Contact.css'

export default function Icon(props) {

    const goToUrl = () => window.open(props.url, '_blank');

    return (
        <div className="icon-contact" onClick={goToUrl}>{props.icon}</div>
    )
}
