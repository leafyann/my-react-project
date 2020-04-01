import React, { Component } from 'react'
import bgVideo from '../../video/404_bg.mp4'
import './style.css'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <video autoPlay muted loop id="myVideo">
                    <source src={bgVideo} type="video/mp4" />
                        Your browser does not support HTML5 video.
                </video>
                <div className="content"><p><a>BACK TO HOME PAGE</a></p></div>
            </div>
        )
    }
}
