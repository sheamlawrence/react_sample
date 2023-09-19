import React, {Component} from "react";
import BouncyShapeComponent from "../features/bouncyshapes/BouncyShapeComponent"
import ShapeArtComponent from "../features/shapeart/ShapeArtComponent";
import BarChartComponent from "../features/chart/bar/BarChartComponent";
import LineChartComponent from "../features/chart/line/LineChartComponent";
import MultiPieChartComponent from "../features/chart/pie/MultiPieChartComponent";

class HomePageComponent extends Component<any, any> {

    render() {
        let header = "Shea M. Lawrence - React Sample"

        return (
            <div id='home-page'>
                <div className='header-div header-bg' id="headerId">
                    {header}
                </div>
                <div className='components-container'>
                    <div className='component-container'>
                        <BarChartComponent/>
                        <LineChartComponent/>
                        <MultiPieChartComponent/>
                    </div>
                    <div className='component-container'>
                        <ShapeArtComponent/>
                        <BouncyShapeComponent/>
                    </div>
                </div>
            </div>

        );
    }
}

export default HomePageComponent;