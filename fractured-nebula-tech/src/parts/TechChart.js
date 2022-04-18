import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";

var firstRender = true;

export default function TechChart(props) {
    var nodes = props.nodes;
    var links = props.links;

    const svgWidth = 1920;
    console.info(nodes);
    const svgHeight = nodes.length*10;


    useEffect(() => {
        if (firstRender) {
            document.getElementById("techChartContainer").innerHTML = '';
            var svg = d3.select("#techChartContainer").append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight);
            firstRender = false;

            var techSankey = d3Sankey.sankey()
                .nodeId(d => d.id)
                .nodeWidth(120)
                .extent([[0, 0], [svgWidth, svgHeight]])
                .nodeAlign(d3Sankey.sankeyJustify)
                ({ nodes, links });

            console.info(nodes);

            const node = svg.append("g")
                .attr("stroke", "#00FF00")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 100)
                .attr("stroke-linejoin", "round")
                .selectAll("rect")
                .data(nodes)
                .join("rect")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("height", d => d.y1 - d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("style", d => "fill:" + getAreaColor(d));

            const titles = svg.append("g")
                .selectAll("text")
                .data(nodes)
                .join("text")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .text(d => d.id);

            const link = svg.append("g")
                .attr("fill", "none")
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0.5)
                .selectAll("path")
                .data(links)
                .join("path")
                .attr("d", d3Sankey.sankeyLinkHorizontal())
                .attr("stroke-width", 2);
        }
    });

    function getAreaColor(t) {
        switch (t.area) {
            case "engineering":
                return "#E67620";
            case "physics":
                return "#2A1299";
            case "society":
                return "#1B991A";
            default:
                break;
        }
    }

    return (
        <div id="techChartContainer" style={{ border: '1px solid #ff00ff' }}>
        </div>
    );
}