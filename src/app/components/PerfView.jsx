/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable no-multi-spaces */
/* eslint-disable newline-per-chained-call */
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line object-curly-newline
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-console */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as d3 from 'd3';
// import { addNewSnapshots } from '../actions/actions';

// const windowRef = useRef(null);
// const winWidth = null;
// const winHeight = null;

// useEffect(() => {
//   if (windowRef.current) {
//     winWidth = windowRef.current.offsetHeight;
//     winHeight = windowRef.current.offsetWidth;
//     console.log('** SETTING WINDOW SIZES: ', winWidth, winHeight);
//   }
// }, [windowRef]);

const PerfView = ({ snapshots, viewIndex }) => {
  const [chartData, setChartData] = useState(snapshots[snapshots.length - 1]);
  const svgRef = useRef(null);
  
  // Todo: implement update functions...
  const [curZoom, setZoom] = useState(null);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [prevZoomLevel, setPrevZoomLevel] = useState(null);
  const [focalNode, setFocalNode] = useState(null);

  // set up color scaling function
  const color = d3.scaleLinear()
    .domain([0, 7])
    .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
    .interpolate(d3.interpolateHcl);

  // set up circle-packing layout function
  const packFunc = useCallback(data => {
    return d3.pack()
    .size([width, height])
    .padding(3)(d3.hierarchy(data)
      .sum(d => {
        // console.log('in pack func. d=', d);
        return d.componentData.actualDuration;
      })
      .sort((a, b) => {
        // console.log('in sort func. a&b=', a, b);
        return b.value - a.value;
    }));
  }, [width, height]);

  // first run, or user has made changes in their app; clear old tree and get current chartData
  useEffect(() => {
    console.log('PerfView -> snapshots', snapshots);
    console.log('Current viewIndex: ', viewIndex);
    for (let i = 0; i < snapshots.length; i++) {
      console.log(`SNAPSHOT[${i}] App actualDuration:`, snapshots[i].children[0].componentData.actualDuration);
    }

    // when user time jumps or changes state, store current zoom level, so we can return to it
    setPrevZoomLevel([focalNode.x, focalNode.y, focalNode.r * 2]);

    // clear old tree
    while (svgRef.current.hasChildNodes()) {
      svgRef.current.removeChild(svgRef.current.lastChild);
    }

    let indexToDisplay = null;
    if (viewIndex < 0) indexToDisplay = snapshots.length - 1;
    else indexToDisplay = viewIndex;

    setChartData(snapshots[indexToDisplay]);
    console.log(`Using snapshots[${indexToDisplay}]`);
  }, [svgRef, viewIndex, snapshots, chartData, focalNode]);

  useEffect(() => {
    console.log('PerfView -> chartData', chartData);

    // generate tree with our data
    const packedRoot = packFunc(chartData);
    // console.log('PerfView -> packedRoot', packedRoot);

    // initial focus points at root of tree
    setFocalNode(packedRoot);   // points at a node
    let curView = null;       // array [x, y, r]

    // set up viewBox dimensions and onClick for parent svg
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
      .on('click', () => zoomTransition(packedRoot));

    // connect circles below root to data
    const node = svg.append('g')
      .selectAll('circle')
      .data(packedRoot.descendants().slice(1))
      .enter().append('circle')
      .attr('fill', d => (d.children ? color(d.depth) : 'white'))
      .attr('pointer-events', d => (!d.children ? 'none' : null))
      .on('mouseover', () => d3.select(this).attr('stroke', '#000'))
      .on('mouseout', () => d3.select(this).attr('stroke', null))
      .on('click', d => {
        console.log('click handler, zoom to d:', d);
        return focalNode !== d && (zoomTransition(d), d3.event.stopPropagation());
      });

    // console.log('PerfView -> node', node);
    // console.log('packedRoot.descendants()', packedRoot.descendants());

    // generate text labels
    const label = svg.append('g')
      .attr('class', 'perf-chart-labels')
      .selectAll('text')
      .data(packedRoot.descendants())
      .enter().append('text')
      .style('fill-opacity', d => (d.parent === packedRoot ? 1 : 0))
      .style('display', d => (d.parent === packedRoot ? 'inline' : 'none'))
      .text(d => {
        // console.log('generating text label for d: ', d);
        return `${d.data.name}: ${Number.parseFloat(d.data.componentData.actualDuration).toFixed(2)}ms`;
      });

    label.exit().remove();
    node.exit().remove();

    // jump to default zoom state
    // if (lastZoomLevel) {
    //   console.log('PerfView -> lastZoomLevel', lastZoomLevel);
    //   zoomTo(lastZoomLevel);
    // } else
    
    zoomTo([packedRoot.x, packedRoot.y, packedRoot.r * 2]);

    // zoom to newView, passed as an array [x, y, r]
    function zoomTo(newView) {
      console.log('zoomTo -> newView', newView);
      const k = width / newView[2];
      curView = newView;
      label.attr('transform', d => `translate(${(d.x - newView[0]) * k},${(d.y - newView[1]) * k})`);
      node.attr('transform', d => `translate(${(d.x - newView[0]) * k},${(d.y - newView[1]) * k})`);
      node.attr('r', d => d.r * k);
    }

    // generate interpolated zoom to target node. target stored in focalNode
    function zoomTransition(destNode) {
      console.log('zoomTransition -> destNode', destNode);
      console.log('zoomTransition: ', curView);
      console.log('focalNode: ', focalNode);
      // const focalNode0 = focalNode;
      focalNode = destNode;

      const transition = svg.transition()
          .duration(d3.event.altKey ? 7500 : 750)
          .tween('zoom', d => {
            const i = d3.interpolateZoom(curView, [focalNode.x, focalNode.y, focalNode.r * 2]);
            return t => zoomTo(i(t));
          });

      label.filter(function (d) { return d.parent === focalNode || this.style.display === 'inline'; })
      .transition(transition)
        .style('fill-opacity', d => (d.parent === focalNode ? 1 : 0))
        .on('start', function (d) { if (d.parent === focalNode) this.style.display = 'inline'; })
        .on('end', function (d) { if (d.parent !== focalNode) this.style.display = 'none'; });
    }
  }, [chartData, color, packFunc, width, height]);

  return <svg className="perfContainer" ref={svgRef} />;
};

export default PerfView;
