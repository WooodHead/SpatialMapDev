import React from 'react';

const renderCircles = (props) => {
  return (coords, index) => {
    // conditional statements to select certain elements:
    const markSelected             = index == props.activeKey ? "rgba(0,0,0,0.3)" : "none";
    const colorSpace               = props.colorSelect == '' ? coords.Colors : props.colScale(coords[props.colorSelect]);
    const toggleUnknown            = props.dispUnknown == true ? props.colorUnknown : "none";
    const legendOrganelleSelection = !props.markerToggle.includes(coords.markers) ? colorSpace : "none";
    // delete true (placeholder for old labels)
    const colorFill                = coords.markers == "unknown" && true != false ? toggleUnknown : legendOrganelleSelection;
    const radiusVar                = props.radiusSelect == '' ? props.radius : props.radius * props.radiusScale(coords[props.radiusSelect]);
    const transpVar                = props.transpSelect == '' ? 0.9 : props.transparencyScale(coords[props.transpSelect]);
    const textVar                  = coords.id;
    const strokeVar                = coords.markers == "unknown" ? "rgba(100,100,100,0)" : "none" ;
    const xPOS                     = props.plotPCA ? props.xScale(coords.PCA1) : props.xScale(coords.TSNE1);
    const yPOS                     = props.plotPCA ? props.yScale(coords.PCA2) : props.xScale(coords.TSNE2);

    const circleProps = {
      cx          : xPOS,
      cy          : yPOS,
      r           : radiusVar,
      fill        : colorFill,
      opacity     : transpVar,
      stroke      : markSelected,
      strokeWidth : props.radius/3,
      key         : index,
    };

    const textProps = {
      x           : xPOS,
      y           : yPOS - radiusVar*1.33,
      textAnchor  : "middle",
      key         : index+0.1
    };

    var output = markSelected == "none" ? <circle {...circleProps} onClick={() => props.SetActiveKey(index, coords.id)}/>
                                        : <g key={index+0.2}>
                                             <circle {...circleProps} onClick={() => props.SetActiveKey(index, coords.id)}/>
                                             <text style={{fontSize: props.radius*props.textSize}}{...textProps}> {textVar} </text>
                                          </g>;

    return output;
  };
};

export default (props) => {
  return <g>{props.filteredData.map(renderCircles(props))}</g>
}
