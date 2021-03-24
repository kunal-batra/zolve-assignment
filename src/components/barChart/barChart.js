import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import isEmpty from "lodash.isempty";
import './style.css'

const BarChart = () => {

    const [apiData, setApiData] = useState({})
    const [page, setPage] = useState('')
    const [pageSize, setpageSize] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    useEffect(() => {
        fetch("https://api.stackexchange.com/2.2/tags?pagesize=10&order=desc&sort=popular&site=stackoverflow")
            .then(res => res.json())
            .then(result => {
                setApiData(result)
            })
            .catch(error => console.log(error))
    }, [])

    function getChartData(dataItems) {
        let chartData = {}
        let labelsArr = dataItems.map(item => {
            return item.name
        })
        let countArr = dataItems.map(item => {
            return item.count
        })
        chartData.labels = [...labelsArr]
        chartData.datasets = [
            {
                label: 'No of Tags',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [...countArr]
            }
        ]
        return chartData
    }

    const handleInputChange = (e, type) => {
        if (type === 'page') {
            setPage(e.target.value)
        } else if (type === 'pageSize') {
            setpageSize(e.target.value)
        } else if (type === 'fromDate') {
            setFromDate(e.target.value)
        } else {
            setToDate(e.target.value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!page && !pageSize && !fromDate && !toDate) {
            alert('Please fill the values to get data')
            return
        }
        let startDate, endDate
        if (toDate && fromDate) {
            startDate = new Date(fromDate).getTime() / 1000
            endDate = new Date(toDate).getTime() / 1000
        }

        let url = `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow`

        if (page) {
            url += `&page=${page}`
        }
        if (pageSize) {
            url += `&pagesize=${pageSize}`
        }
        if (startDate && endDate) {
            url += `&fromdate=${startDate}&todate=${endDate}`
        }

        fetch(url)
            .then(res => res.json())
            .then(result => {
                setApiData(result)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="chart-container">
            {!isEmpty(apiData) && (
                <React.Fragment>
                    <Bar
                        data={getChartData(apiData.items)}
                        width={100}
                        height={50}
                        options={{
                            title: {
                                display: true,
                                text: 'Popular Languages',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'bottom'
                            },
                            maintainAspectRatio: false
                        }}
                    />
                    <div className="title">
                        <p>Modify Graph data</p>
                    </div>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label>
                                Page: <input type="number" min={1} value={page} onChange={(e) => handleInputChange(e, 'page')} />
                            </label>
                            <label>
                                Page Size: <input type="number" min={1} value={pageSize} onChange={(e) => handleInputChange(e, 'pageSize')} />
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                From: <input type="date" value={fromDate} onChange={(e) => handleInputChange(e, 'fromDate')} />
                            </label>
                            <label>
                                To: <input type="date" value={toDate} onChange={(e) => handleInputChange(e, 'toDate')} />
                            </label>
                        </div>
                        <input type="submit" value="Submit" className="submit" />
                    </form>
                </React.Fragment>
            )}
        </div>
    )
}

export default BarChart