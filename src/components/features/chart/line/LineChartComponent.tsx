import React, {Component} from "react";
import {faker} from '@faker-js/faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ChartType, ChartOptions, PluginChartOptions, LegendOptions, LayoutPosition,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {Button} from "reactstrap";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
}

class LineChartComponent extends Component<any,any> {

    constructor(props: Props) {
        super(props)
        this.state = {
            barOptions: { },
            labels: [],
            barData: {
                labels: [],
                datasets: [],
            },
            lineOptions: { },
            lineData: {
                labels: [],
                datasets: [],
            },
            multiPieOptions: { },
            multiPieData: {
                labels: [],
                datasets: [],
            }
        }
    }

    render() {
        return (
            <div>
                <div className={'title-div'}>
                    <h1 className={'title'}>Line Chart</h1>
                </div>
                <div className={'button-div'}>
                    <Button className={'button'} color="primary" onClick={this.changeData.bind(this)} id="change-data-button">Change Data</Button>
                </div>
                <div className='widget-div'>
                    <Line
                        data={this.state.lineData as any}
                        options={this.state.lineOptions as any}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.generateData();
    }

    changeData() {
        this.generateData();
    }

    generateData() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.setState({
            lineOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top' as any,
                    },
                    title: {
                        display: false,
                    },
                },
            },
            lineData: {
                labels: months,
                datasets: [
                    {
                        label: 'Cherry',
                        data: months.map(() => faker.number.int({ min: 0, max: 1000 })),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Blueberry',
                        data: months.map(() => faker.number.int({ min: 0, max: 1000 })),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            }
        })
    }
}

export default LineChartComponent;