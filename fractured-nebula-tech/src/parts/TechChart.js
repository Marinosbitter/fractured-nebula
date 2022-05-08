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
    });

    function buildTechSankey(props) {
        var graph = d3Sankey.sankey()
            .nodeId();

        console.info(graph);

        const svg = d3.create("svg")
            .attr("width", 1920)
            .attr("height", 1080)
            .attr("viewBox", [0, 0, 1920, 1080])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        const node = svg.append("g")
        // .attr("stroke", nodeStroke)
        // .attr("stroke-width", nodeStrokeWidth)
        // .attr("stroke-opacity", nodeStrokeOpacity)
        // .attr("stroke-linejoin", nodeStrokeLinejoin)
        // .selectAll("rect")
        // .data(nodes)
        // .join("rect")
        // .attr("x", d => d.x0)
        // .attr("y", d => d.y0)
        // .attr("height", d => d.y1 - d.y0)
        // .attr("width", d => d.x1 - d.x0);

        const link = svg.append("g")
        // .attr("fill", "none")
        // .attr("stroke-opacity", linkStrokeOpacity)
        // .selectAll("g")
        // .data(links)
        // .join("g")
        // .style("mix-blend-mode", linkMixBlendMode);

        return svg.node();
    }

    return (
        <div id="techChartContainer" style={{ border: '1px solid #ff00ff' }}>
        </div>
    );
}