import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const StockChart = ({ stockData }) => {
    const options = {
        title: {
            text: ''
        },
        rangeSelector: {
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
            }, {
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 1,
            inputEnabled: false
        },
        plotOptions: {
            candlestick: {
                color: '#ef5350',
                upColor: '#26a69a'
            }
        },

        series: [{
            type: 'candlestick',
            data: stockData,
            tooltip: {
                valueDecimals: 2
            }
        }]
    };


    return (
        <div className="p-4 bg-white rounded shadow-md">
            <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
        </div>
    );
};

export default StockChart;