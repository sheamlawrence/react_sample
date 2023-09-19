import React, {Component, FC} from 'react';
import {Button, Col, Container, Row} from "reactstrap";

import Two from "twojs-ts";

class ShapeArtComponent extends Component<any, any> {

    private height = 400;
    private width = 600;

    private shapeArtRef = React.createRef<HTMLDivElement>();
    private two = new Two({
        type: Two.Types.canvas,
        fullscreen: false,
        height: this.height,
        width: this.width,
        autostart: true
    })

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={'title-div'}>
                    <h1 className={'title'}>Abstract Art</h1>
                </div>
                <div className={'button-div'}>
                    <Button className={'button'} color="primary" onClick={this.makeArt.bind(this)} id="make-art-button">Regenerate
                        Art!</Button>
                </div>
                <div id="#shape-art-ref" className="widget-div" ref={this.shapeArtRef}/>
            </div>
        );
    }

    componentDidMount() {
        if (this.shapeArtRef.current) {
            this.two.appendTo(this.shapeArtRef.current);
        }
        this.makeArt();
    }

    makeArt() {
        this.two.clear();
        this.draw(this.two)
    }

    draw(two: any): void {
        let shape;
        let shapes: Two.Shape[] = [];
        for (let i = 0; i < 150; i++) {
            if (i % 2 == 0) {
                shape = two.makeRectangle(
                    Math.floor(Math.random() * 400 * 2),
                    Math.floor(Math.random() * 420 * 2),
                    10 + Math.floor(Math.random() * 100),
                    10 + Math.floor(Math.random() * 100)
                );
            } else if (i % 3 == 0) {
                shape = two.makeCircle(Math.floor(Math.random() * 400 * 2),
                    Math.floor(Math.random() * 420 * 2),
                    10 + Math.floor(Math.random() * 100))
            } else {
                shape = two.makeEllipse(
                    Math.floor(Math.random() * 400 * 2),
                    Math.floor(Math.random() * 420 * 2),
                    10 + Math.floor(Math.random() * 100),
                    10 + Math.floor(Math.random() * 100))
            }

            if (i % 3 == 0) {
                shape.fill = 'rgba(' + (Math.floor(Math.random() * 100)) + ', ' + (Math.floor(Math.random() * 100)) + ', ' + (Math.floor(Math.random() * 100)) + ', 0.6)';
            } else {
                shape.noFill();
            }

            shape.stroke = 'rgba(' + (Math.floor(Math.random() * 100)) + ', ' + (Math.floor(Math.random() * 100)) + ', ' + (Math.floor(Math.random() * 100)) + ', 0.6)';
            shape.linewidth = Math.floor(Math.random() * 6);
            shapes.push(shape);
        }

        two.update();

    }
}

export default ShapeArtComponent;