import React, { useState, useEffect } from 'react';
import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";

export default function TechChart(props) {
    var nodes = props.nodes;
    var links = props.links;

    const svgWidth = 1920;
    const svgHeight = Math.max(nodes.length * 20, 400);
    const svgPadding = 100;

    useEffect(() => {
        document.getElementById("techChartContainer").innerHTML = '';
        var svg = d3.select("#techChartContainer").append("svg")
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

        var techSankey = d3Sankey.sankey()
            .nodeId(d => d.id)
            .nodeWidth(20)
            .nodePadding(24)
            .extent([[0 + svgPadding, 0 + svgPadding], [svgWidth - svgPadding * 2, svgHeight - svgPadding]])
            .nodeAlign(d3Sankey.sankeyLeft)
            ({ nodes, links });

        const link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke-opacity", 0.2)
            .selectAll("path")
            .data(links)
            .join("path")
            .attr("d", d3Sankey.sankeyLinkHorizontal())
            .attr("stroke", d => getAreaColor(d.source))
            .attr("stroke-width", d => d.width);

        const node = svg.append("g")
            .attr("stroke", "#000")
            .attr("stroke-width", 3)
            .attr("stroke-opacity", 100)
            .attr("stroke-linejoin", "round")
            .selectAll("rect")
            .data(nodes)
            .join("rect")
            .attr("stroke", d => getPropColor(d))
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", d => d.y1 - d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("style", d => "fill:" + getAreaColor(d))
            .on("click", (e, d) => props.setSelectedTech(d.id));

        const titles = svg.append("g")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .attr("x", d => d.x0 + 24)
            .attr("y", d => d.y0 + (d.y1 - d.y0) / 2)
            .attr("fill", d => getPropColor(d))
            .text(d => d.id)
            .on("click", (e, d) => props.setSelectedTech(d.id));
    });

    function getAreaColor(t) {
        switch (t.area) {
            case "engineering":
                return "#F5862E";
            case "physics":
                return "#2267F5";
            case "society":
                return "#31A877";
            default:
                break;
        }
    }
    function getPropColor(t) {
        switch (true) {
            case t.is_dangerous:
                return "#B80006";
            case t.is_rare:
                return "#A400B3";
            default:
                return "#000";
        }
    }

    return (
        <div id="techChartContainer" style={{ border: '1px solid #ff00ff' }}>
        </div>
    );
}