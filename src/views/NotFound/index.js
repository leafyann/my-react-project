import React, { Component } from 'react'
import bgVideo from '../../video/404_bg.mp4'
import './style.css'

class NotFound extends Component {
    render() {
        return (
            <div>
                <video autoPlay muted loop id="myVideo">
                    <source src={bgVideo} type="video/mp4" />
                        Your browser does not support HTML5 video.
                </video>
                <div className="content"><button onClick={this.props.history.goBack}>GO BACK</button></div>
            </div>
        )
    }
}

export default NotFound
