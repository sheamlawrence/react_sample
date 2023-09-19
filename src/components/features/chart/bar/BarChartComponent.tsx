import React, {Component} from "react";
import {faker} from '@faker-js/faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {Button} from "reactstrap";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
}

class BarChartComponent extends Component<any,any> {

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
                    <h1 className={'title'}>Bar Chart</h1>
                </div>
                <div className={'button-div'}>
                    <Button className={'button'} color="primary" onClick={this.changeData.bind(this)} id="change-data-button">Change Data</Button>
                </div>
                <div className='widget-div'>
                    <Bar
                        data={this.state.barData as any}
                        options={this.state.barOptions as any}/>
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
        const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
        this.setState({
            barOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top' as any,
                    },
                    title: {
                        display: false,
                        text: 'Bar Chart',
                    },
                },
            },
            barData: {
                labels: years,
                datasets: [
                    {
                        label: 'Green Team',
                        data: years.map(() => faker.number.int({ min: 0, max: 1000 })),
                        backgroundColor: 'rgba(21, 242, 206, 0.8)',
                    },
                    {
                        label: 'Blue Team',
                        data: years.map(() => faker.number.int({ min: 0, max: 1000 })),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            }
        })
    }
}

export default BarChartComponent;