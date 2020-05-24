import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';
import {Paper, Button} from '@material-ui/core'
import "../../scss/imageSlider.scss"
import "../../css/hoverable.css"
import h3 from './h3.jpg'
import h4 from './h4.jpg'
import h16 from './h16.jpg'
import h5 from './h5.jpg'
import h12 from './h12.jpg'


function Project(props) {
    return (
        <Paper
            className="Project hoverable"
            style={{
                backgroundColor: props.item.color,
                backgroundImage: `url(${props.item.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: "fixed",
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
            elevation={10}
        >
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

const items = [
    {
        name: "",
        description:"Dress That Makes You Happy And Beautiful...",
        color: "#7D85B1",
        image:h16

    },
    {
        name: "",
        description: "Our Solution For Any Casual Event... ",
        color: "#7D85B1",
        image: h4
    },
    {
        name: "",
        description: "An Exciting Romance With Warmth Of Freedom...",
        color: "#CE7E78",
        image: h3
    },
    {
        name: "",
        description: "Find Your Gorgeous Wear..." ,
        color: "#C9A27E",
        image: h5
    },

    {
        name: "",
        description: "Leather Collection Styles To Let You Free...",
        color: "#C9A27E",
        image:h12
    }
]

export default class TopImageSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: true,
            timer: 600,
            animation: "fade",
            indicators: true,
            timeout: 500
        }

        autoBind(this);
    }

    render() {
        return (
            <React.Fragment>
                <Carousel
                    className="SecondExample"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                >
                    {
                        items.map((item, index) => {
                            return <Project item={item} key={index}/>
                        })
                    }
                </Carousel>
            </React.Fragment>
        )
    }
}
