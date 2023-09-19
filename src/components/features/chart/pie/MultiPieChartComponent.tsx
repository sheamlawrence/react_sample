import React, {Component} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend, ChartType, ChartOptions, PluginChartOptions, LegendOptions, LayoutPosition, Chart,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {Button} from "reactstrap";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
}

class MultiPieChartComponent extends Component<any,any> {

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
        };
    }

    render() {
        return (
            <div>
                <div className={'title-div'}>
                    <h1 className={'title'}>Multi Pie Chart</h1>
                </div>
                <div className={'button-div'}>
                    <Button className={'button'} color="primary" onClick={this.changeData.bind(this)} id="change-data-button">Change Data</Button>
                </div>
                <div className='widget-div'>
                    <Pie
                        data={this.state.multiPieData as any}
                        options={this.state.multiPieOptions as any}/>
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
        const groups = ['Yes', 'No', 'A-Yes', 'A-No', 'B-Yes', 'B-No', 'C-Yes', 'C-No'];
        const dummyData: number[][] = [];
        for (let i = 0; i < 4; i++) {
            const p1 = Math.floor(Math.random() * 100);
            const p2 = 100 - p1;
            const percentPair: number[] = []
            percentPair.push(p1)
            percentPair.push(p2)
            dummyData.push(percentPair)
        }
        this.setState({
            multiPieOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            generateLabels: function(chart) {
                                // Get the default label list
                                const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
                                const labelsOriginal = original.call(this, chart);

                                // Build an array of colors used in the datasets of the chart
                                let datasetColors = chart.data.datasets.map(function(e) {
                                    return e.backgroundColor;
                                });
                                datasetColors = datasetColors.flat();
                                console.log('labels:',JSON.stringify(labelsOriginal));
                                // Modify the color and hide state of each label
                                labelsOriginal.forEach(label => {
                                    console.log('doing label:', JSON.stringify(label));
                                    if (label.index !== undefined) {
                                        // There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
                                        label.datasetIndex = (label.index - label.index % 2) / 2;

                                        // The hidden state must match the dataset's hidden state
                                        label.hidden = !chart.isDatasetVisible(label.datasetIndex);

                                        // Change the color to match the dataset
                                        label.fillStyle = datasetColors[label.index];
                                    }
                                });

                                return labelsOriginal;
                            }
                        },
                        onClick: function(mouseEvent, legendItem, legend) {
                            // toggle the visibility of the dataset from what it currently is
                            legend.chart.getDatasetMeta(
                                legendItem.datasetIndex
                            ).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
                            legend.chart.update();
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
                                return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue + ' %';
                            }
                        }
                    }
                }
            },
            multiPieData: {
                labels: groups,
                datasets: [
                    {
                        backgroundColor: ['#AAA', '#777'],
                        data: dummyData[0]
                    },
                    {
                        backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
                        data: dummyData[1]
                    },
                    {
                        backgroundColor: ['hsl(100, 100%, 60%)', 'hsl(100, 100%, 35%)'],
                        data: dummyData[2]
                    },
                    {
                        backgroundColor: ['hsl(180, 100%, 60%)', 'hsl(180, 100%, 35%)'],
                        data: dummyData[3]
                    }
                ]
            }
        })
    }
}

export default MultiPieChartComponent