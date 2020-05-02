import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';
import {Paper, Button} from '@material-ui/core'
import "../../scss/imageSlider.scss"

function Project(props) {
    return (
        <Paper
            className="Project"
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
        name: "Lear Music Reader",
        description: "A PDF Reader specially designed for musicians.",
        color: "#7D85B1",
        image: "https://source.unsplash.com/featured/?wedding-dress"

    },
    {
        name: "Hash Code 2019",
        description: "My Solution on the 2019 Hash Code by Google Slideshow problem.",
        color: "#7D85B1",
        image: "https://source.unsplash.com/featured/?fashion-men"
    },
    {
        name: "Terrio",
        description: "A exciting mobile game game made in the Unity Engine.",
        color: "#CE7E78",
        image: "https://source.unsplash.com/featured/?fashion-woman"
    },
    {
        name: "React Carousel",
        description: "A Generic carousel UI component for React using material ui.",
        color: "#C9A27E",
        image: "https://source.unsplash.com/featured/?fashion-bag"
    },

    {
        name: "React Carousel",
        description: "A Generic carousel UI component for React using material ui.",
        color: "#C9A27E",
        image: "https://source.unsplash.com/featured/?party-dress"
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
