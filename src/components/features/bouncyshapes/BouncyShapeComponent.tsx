import React, {Component} from 'react';
import {Button} from 'reactstrap';
import Two from 'twojs-ts';

class BouncyShapeComponent extends Component<any, any> {

    private shapeId = 0;
    private bouncyShapesRef = React.createRef<HTMLDivElement>();
    private firstLoad = true;
    private height = 400;
    private width = 600;
    private two: Two = new Two({
        type: Two.Types.canvas,
        fullscreen: false,
        height: this.height,
        width: this.width,
        autostart: true
    })
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            // let elem3 = document.getElementById('bouncyShapesElementId');
            this.makeShapes();
            this.setState({
                isLoading: false,
                status: "Completed!"
            });
        }, 2000);
    }

    render() {
        return (
            <div>
                <div className={'title-div'}>
                    <h1 className={'title'}>Primordial Soup</h1>
                </div>
                <div className={'button-div'}>
                    <Button className={'button'} color="primary" onClick={this.makeShapes.bind(this)} id="make-art-button">Add More!</Button>
                </div>
                <div className="widget-div" ref={this.bouncyShapesRef}/>
            </div>
        );
    }
    
    makeShapes() {

        if (this.bouncyShapesRef.current && this.firstLoad) {
            this.two.appendTo(this.bouncyShapesRef.current);
            this.firstLoad = false;
        }

        let numberOfShapes = 60;
        let listOfShapes: any[] = [];

        for (let i = 0; i < numberOfShapes; i++) {
            let heightVal = Math.floor(Math.random() * this.height);
            let widthVal = Math.floor(Math.random() * this.width);
            var shape = new Shape(this.two, widthVal, heightVal, Math.floor(Math.random() * 10) + 10,
                Math.floor(Math.random() * 10) + 10, (Math.floor(Math.random() * 50) % 2) == 0,
                (Math.floor(Math.random() * 50) % 2) == 0, ++this.shapeId);
            if (heightVal < this.two.height) {
                heightVal = heightVal + 75;
            }
            if (heightVal > this.two.height) {
                heightVal = 0;
                widthVal = widthVal + 250;
            }
            if (widthVal > this.two.width) {
                widthVal = 20;
            }
            listOfShapes[i] = shape;
        }

        this.two.bind('update' as Two.Events, function () {
            const touchAlreadyHandled = [];
            listOfShapes.forEach(function (shape) {
                shape.moveCoordsIfTouching(shape, listOfShapes, touchAlreadyHandled);
            });

            for (let i = 0; i < numberOfShapes; i++) {
                // Move a shapeangle
                const shape = listOfShapes[i];
                shape.move();
            }
        }).play();
    }
}

class Shape {
    name = "" + Math.random();
    shapeXX = 0;
    shapeYY = 0;
    shapeHH = Math.floor(Math.random() * 20) + 15;
    shapeWW = 0
    two: any;
    movingDownD = true;
    movingRightR = true;
    shape: any = null;
    shrinkingX = false;
    shrinkingY = false;
    xDif = Math.floor(Math.random() * 2) + 1;
    yDif = Math.floor(Math.random() * 2) + 1;
    rVal = Math.floor(Math.random() * 200);
    gVal = Math.floor(Math.random() * 100);
    bVal = Math.floor(Math.random() * 255);
    addX = 0;
    addY = 0;
    id;

    constructor(two, shapeXX, shapeYY, shapeHH, shapeWW, movingDownD, movingRightR, id) {
        this.id = id;
        this.shapeXX = shapeXX;
        this.shapeYY = shapeYY;
        this.shapeHH = shapeHH;
        this.shapeWW = shapeWW;
        this.movingDownD = movingDownD;
        this.movingRightR = movingRightR;
        this.two = two;
        // this.shape = two.makeShapeangle(shapeXX, shapeYY, shapeHH, shapeWW);
        this.shape = two.makeCircle(shapeXX, shapeYY, shapeHH)
        if (this.shape !== null) {
            this.shape.fill = 'rgba(' + this.rVal + ', ' + this.gVal + ', ' + this.bVal + ', 0.9)';
            this.shape.noStroke();
        }

    }

    moveCoordsIfTouching(shape, shapeList, handled) {
        let thisShapeXX = shape.shapeXX;
        let thisShapeYY = shape.shapeYY;
        let thisShapeHH = shape.shapeHH;
        let thisShapeWW = shape.shapeWW;
        let moveR = this.movingRightR;
        let moveD = this.movingDownD;
        let touchList: any[] = [];
        let wasTouching = false;
        shapeList.forEach(function (curShape) {
            if (shape.id !== curShape.id && !handled.includes(curShape.id)) {
                if (((thisShapeYY - 5 > curShape.shapeYY - 5 && thisShapeYY< curShape.shapeYY + curShape.shapeHH + 5) // TOP LEFT POINT
                        && (thisShapeXX - 5 > curShape.shapeXX - 5 && thisShapeXX < curShape.shapeXX + curShape.shapeWW + 5))
                    || ((thisShapeYY + thisShapeHH + 5 > curShape.shapeYY - 5 && thisShapeYY + thisShapeHH + 5 < curShape.shapeYY + curShape.shapeHH + 5) // BOTTOM LEFT POINT
                        && (thisShapeXX - 5 > curShape.shapeXX - 5 && thisShapeXX - 5 < curShape.shapeXX + curShape.shapeWW + 5))
                    || ((thisShapeYY - 5 > curShape.shapeYY - 5 && thisShapeYY + thisShapeHH + 5 < curShape.shapeYY + curShape.shapeHH + 5) // TOP RIGHT POINT
                        && (thisShapeXX + thisShapeWW + 5 > curShape.shapeXX - 5 && thisShapeXX + thisShapeWW + 5 < curShape.shapeXX + curShape.shapeWW + 5))
                    || ((thisShapeYY + thisShapeHH + 5 > curShape.shapeYY - 5 && thisShapeYY + thisShapeHH + 5 < curShape.shapeYY + curShape.shapeHH + 5) // BOTTOM RIGHT POINT
                        && (thisShapeXX + thisShapeWW + 5 > curShape.shapeXX - 5 && thisShapeXX + thisShapeWW + 5 < curShape.shapeXX + curShape.shapeWW + 5))) {
                    // Touching
                    touchList.push(curShape);
                    handled.push(curShape.id)
                    wasTouching = true;
                }
            }
        });
        let extraX = 1;
        let extraY = 1;
        touchList.forEach(function (curShape) {
            curShape.movingDownD = !curShape.movingDownD;
            curShape.movingRightR = !curShape.movingRightR;
            if (!curShape.movingDownD) {
                curShape.addY = -1 * extraY;
            } else {
                curShape.addY = extraY;
            }
            if (!curShape.movingRightR) {
                curShape.addX = -1 * extraX;
            } else {
                curShape.addX = extraX;
            }
        });


        if (wasTouching) {
            if (!this.movingDownD) {
                extraY = -1 * extraY;
            }
            if (!this.movingRightR) {
                extraX = -1 * extraX;
            }
            this.addX = extraX;
            this.addY = extraY;
            this.movingRightR = !this.movingRightR;
            this.movingDownD = !this.movingDownD;
        } else {
            this.addX = 0;
            this.addY = 0;
        }
    }

    move() {
        if (this.xDif == 0) {
            this.xDif = 5;
        }
        if (this.yDif == 0) {
            this.yDif = 5;
        }
        if (this.shapeXX - 5 > this.two.width) {
            this.movingRightR = false;
        }
        if (this.shapeXX < 5) {
            this.movingRightR = true;
        }
        if (this.shapeYY - 5 > this.two.height) {
            this.movingDownD = false;
        }
        if (this.shapeYY < 10) {
            this.movingDownD = true;
        }
        if (this.movingDownD && this.movingRightR) {
            this.shapeXX = this.shapeXX + this.xDif + this.addX;
            this.shapeYY = this.shapeYY + this.yDif + this.addY;
        } else if (this.movingDownD && !this.movingRightR) {
            this.shapeXX = this.shapeXX - this.xDif + this.addX;
            this.shapeYY = this.shapeYY + this.yDif + this.addY;
        } else if (!this.movingDownD && this.movingRightR) {
            this.shapeXX = this.shapeXX + this.xDif + this.addX;
            this.shapeYY = this.shapeYY - this.yDif + this.addY;
        } else if (!this.movingDownD && !this.movingRightR) {
            this.shapeXX = this.shapeXX - this.xDif - this.addX;
            this.shapeYY = this.shapeYY - this.yDif + this.addY;
        }

        if (this.addX > 0 || this.addY > 0) {
            this.addX = 0;
            this.addY = 0;
        }

        if (this.shapeWW > 50) {
            this.shrinkingX = true;
        } else if (this.shapeWW < 30) {
            this.shrinkingX = false;
        }
        if (this.shapeHH > 50) {
            this.shrinkingY = true;
        } else if (this.shapeHH < 30) {
            this.shrinkingY = false;
        }
        this.two.remove(this.shape);
        this.shape = this.two.makeCircle(this.shapeXX, this.shapeYY, this.shapeHH);
        this.shape.fill = 'rgba(' + this.rVal + ', ' + this.gVal + ', ' + this.bVal + ', 0.6)';
        this.shape.noStroke();
    }
}

export default BouncyShapeComponent;