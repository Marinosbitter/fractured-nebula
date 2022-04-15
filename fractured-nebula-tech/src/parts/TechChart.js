import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";

var firstRender = true;

export default function TechChart(props) {
    // var [firstRender, setFirstRender] = useState(0);

    useEffect(() => {
        var techChart = buildTechSankey();

        if (firstRender) {
            document.getElementById("techChartContainer").innerHTML = '';
            document.getElementById("techChartContainer").appendChild(techChart);
            firstRender = false;
        }
        console.info(props);
    });

    function buildTechSankey() {
        var chart = document.createElement('p');
        chart.innerHTML = `This sankey will have: ${Object.keys(props.nodes).lenght} techs, and ${Object.keys(props.links).lenght} links.`;
        return chart;
    }

    return (
        <div id="techChartContainer" style={{ border: '1px solid #ff00ff' }}>
        </div>
    );
}