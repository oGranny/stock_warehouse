// /imports/ui/pages/HomePage.jsx

import React, { useState } from 'react'
import { useSearchParams, Redirect } from "react-router-dom"
import { Meteor } from 'meteor/meteor'
import LoginPage from './LoginPage'
import StockChart from './ChartPage'


var token = ""
const HomePage = () => {
    const [searchParams] = useSearchParams()
    code = searchParams.get("code")
    if (code == null) {
        return <LoginPage />
    }

    if (token == "") {
        Meteor.call('getAccessToken', code, (error, result) => {
            if (error) {
                console.error('Method call failed:', error)
            } else {
                console.log('Method call result:', result.access_token)
                token = result.access_token
            }
        })
    } else {
        console.log(token)
    }

    // Meteor.call('getStockDetails', { "isin": "INE002A01018", "token": token }, (error, result) => {
    //     console.log('token: ' + token)
    //     if (error) {
    //         console.error('Method call failed:', error)
    //     } else {
    //         console.log('Method call result, stock result:', result)
    //     }
    // })


    const [selectedStock, setSelectedStock] = useState(null)
    const [stockDetails, setStockDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const stocks = [
        {
            "id": "INE002A01018",
            "name": "Reliance",
            "symbol": "RELIANCE"
        },
        {
            "id": "INE467B01029",
            "name": "TCS",
            "symbol": "TCS"
        },
        {
            "id": "INE040A01034",
            "name": "HDFC Bank",
            "symbol": "HDFCBANK"
        },
        {
            "id": "INE009A01021",
            "name": "Infosys",
            "symbol": "INFY"
        },
        {
            "id": "INE030A01027",
            "name": "Hindustan Uniliver",
            "symbol": "HINDUNILVR"
        },
        {
            "id": "INE090A01021",
            "name": "ICICI Bank",
            "symbol": "ICICIBANK"
        },
        {
            "id": "INE237A01028",
            "name": "Kotak Bank",
            "symbol": "KOTAKBANK"
        },
        {
            "id": "INE062A01020",
            "name": "SBI Bank",
            "symbol": "SBIN"
        },
        {
            "id": "INE397D01024",
            "name": "Bharti Airtel",
            "symbol": "BHARTIARTL"
        },
        {
            "id": "INE860A01027",
            "name": "HCL Technologies ",
            "symbol": "HCLTECH"
        },
        {
            "id": "INE154A01025",
            "name": "ITC",
            "symbol": "ITC"
        },
        {
            "id": "INE021A01026",
            "name": "Asian Paints",
            "symbol": "ASIANPAINT"
        },
        {
            "id": "INE075A01022",
            "name": "Wipro",
            "symbol": "WIPRO"
        },
        {
            "id": "INE238A01034",
            "name": "Axis Bank",
            "symbol": "AXISBANK"
        },
        {
            "id": "INE585B01010",
            "name": "Maruti Suzuki",
            "symbol": "MARUTI"
        },
        {
            "id": "INE018A01030",
            "name": "Lasen Turbo",
            "symbol": "LT"
        },
        {
            "id": "INE481G01011",
            "name": "Ultratech cement",
            "symbol": "ULTRACEMCO"
        },
        {
            "id": "INE192R01011",
            "name": "DMART",
            "symbol": "DMART"
        }
    ]

    const fetchStockDetails = (stock) => {
        setLoading(true)
        Meteor.call('fetchStockDetails', { "id": stock.id, "token": token }, (error, result) => {
            setLoading(false)
            if (error) {
                console.error('Error fetching stock details:', error.message)
            } else {
                setStockDetails(result)
            }
        })
    }

    const handleStockClick = (stock) => {
        setSelectedStock(stock)
        setStockDetails(null)
        fetchStockDetails(stock)
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <nav className="bg-gray-800 p-4 shadow-lg">
                <h1 className="text-left text-3xl font-bold">Stock Warehouse</h1>
            </nav>
            <div className="flex flex-1 p-4 space-x-4 overflow-hidden">
                <aside className="w-1/3 bg-gray-800 p-6 border-r border-gray-700 overflow-y-auto rounded-lg shadow-lg sticky top-0">
                    <h2 className="text-xl font-semibold mb-6">Stock List</h2>
                    <div className="flex flex-col space-y-4">
                        {stocks.map(stock => (
                            <div
                                key={stock.id}
                                className={`p-4 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300 ${selectedStock === stock ? 'bg-gray-700' : ''}`}
                                onClick={() => handleStockClick(stock)}
                            >
                                {stock.name}
                            </div>
                        ))}
                    </div>
                </aside>
                <main className="flex-1 bg-gray-800 p-8 rounded-lg shadow-lg overflow-y-auto">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-xl text-gray-500">Loading...</p>
                        </div>
                    ) : stockDetails ? (
                        <div className="w-full">
                            <h2 className="text-2xl font-bold mb-4">{stockDetails.data[Object.keys(stockDetails.data)[0]].symbol}</h2>
                            <p>
                                <div>Symbol: {stockDetails.data[Object.keys(stockDetails.data)[0]].symbol}</div>
                                <div>Last Price: {stockDetails.data[Object.keys(stockDetails.data)[0]].last_price}</div>
                                <div>Average Price: {stockDetails.data[Object.keys(stockDetails.data)[0]].average_price}</div>
                                <div>open Price: {stockDetails.data[Object.keys(stockDetails.data)[0]].ohlc.open}</div>
                                <div>high Price: {stockDetails.data[Object.keys(stockDetails.data)[0]].ohlc.high}</div>
                                <div>low Price: {stockDetails.data[Object.keys(stockDetails.data)[0]].ohlc.low}</div>
                                <div>close Price: {stockDetails.data[Object.keys(stockDetails.data)[0]].ohlc.close}</div>
                                <div className="container mx-auto p-4">
                                    <h1 className="text-2xl font-bold mb-4">Stock Price Chart: </h1>
                                    <StockChart stockData={stockDetails.history} />
                                </div>
                            </p>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-xl text-gray-500">Select a stock to see details</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default HomePage
