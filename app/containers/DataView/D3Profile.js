import React from 'react';
import d3 from 'd3';
import DataCircles from './dataPoints.js';
import DataCircles from './data-circles.js';
import XYAxis from './x-y-axis.js';

//min max values
const xMax   = (data)  => d3.max(data, (d) => props.plotPCA ? d.PCA1 : d.TSNE1;
const xMin   = (data)  => d3.min(data, (d) => props.plotPCA ? d.PCA1 : d.TSNE1;

const yMax   = (data)  => d3.max(data, (d) => props.plotPCA ? d.PCA2 : d.TSNE2);
const yMin   = (data)  => d3.min(data, (d) => props.plotPCA ? d.PCA2 : d.TSNE2);

//color gradient
const colMin = function(data,props) {
  return d3.min(data, (d) => d[props.colorSelect]);
};

const colMax = function(data,props) {
  return d3.max(data, (d) => d[props.colorSelect]);
};

const marshalProps = (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return Object.assign({}, props, scales);
};

//radius gradient
const radMin = function(data,props) {
  return d3.min(data, (d) => d[props.radiusSelect]);
};

const radMax = function(data,props) {
  return d3.max(data, (d) => d[props.radiusSelect]);
};

//transparency gradient
const transpMin = function(data,props) {
  return d3.min(data, (d) => d[props.transpSelect]);
};

const transpMax = function(data,props) {
  return d3.max(data, (d) => d[props.transpSelect]);
};

//scaling dimensions
const xScale = (props) => {
  return d3.scale.linear()
    .domain([xMin(props.data), xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};

const yScale = (props) => {
  return d3.scale.linear()
    .domain([yMin(props.data), yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

//scaling functions
//color scaling , radius scaling, transparency scaling
const colScale = (props) => {
  return d3.scale.linear()
         .domain([colMin(props.data, props),colMax(props.data, props)])
         .range(["blue","red"]);
};

const radiusScale = (props) => {
  return d3.scale.linear()
         .domain([radMin(props.data, props),radMax(props.data, props)])
         .range([0.4,5.5]);
};

const transparencyScale = (props) => {
  return d3.scale.linear()
         .domain([transpMin(props.data, props),transpMax(props.data, props)])
         .range([0.2,1]);
};

//export set of dataCircles
export default (props) => {
  const scales = { xScale: xScale(props),
                   yScale: yScale(props),
                   colScale: colScale(props),
                   radiusScale: radiusScale(props),
                   transparencyScale : transparencyScale(props)};
  return <g><XYAxis {...props}/><DataCircles {...props} {...scales} SetActiveKey={props.SetActiveKey} />
             </g>
};
