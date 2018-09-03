import React, { Component } from 'react';
import {
    CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {Masonry} from './Masonry';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.brakePoints = [350, 500, 750];
        this.images = [];
        this.imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92, 643];
        for (let i = 0; i < this.imgId.length; i++) {
            const ih = 200 + Math.floor(Math.random() * 10) * 15;
            this.images.push("https://unsplash.it/250/" + ih + "?image=" + this.imgId[i]);
        }
    }
    render() {
        return (
            <Masonry brakePoints={this.brakePoints}>
                {this.images.map((image, id) => {
                    return (
                        <div className="" key={id}>
                          
                                <CardImg top width="100%" src={image} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            
                        </div>
                    )
                })}
            </Masonry>
        )
    }
}



