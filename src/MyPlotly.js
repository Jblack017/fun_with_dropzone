import React from 'react'
import Plot from 'react-plotly.js'

export default function MyPlotly({ xAxis, projectionLower, projection, projectionUpper }) {

    return (
        <Plot
        data={[
            {
                x: xAxis,
                y: projectionUpper,
                type: 'lines+markers',
                name: "Projection upper",
                line: {
                    color: 'rgb(0, 0, 255)',
                    width: 2
                }
            },  
            {
                x: xAxis,
                y: projection,
                type: 'lines+markers',
                name: "Projection",
                line: {
                    color: 'rgb(128, 0, 128)',
                    width: 3
                }
            },
            {
                x: xAxis,
                y: projectionLower,
                type: 'lines+markers',
                name: 'projection lower',
                line: {
                    color: 'rgb(255, 0, 0)',
                    width: 2
                }
            },
        ]}
        layout={ {width: "auto", height: 'auto', title: "A Fancy Plot",}} 
        />
    )
}
