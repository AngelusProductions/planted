import React from 'react';
import * as i from 'assets/icons';

export default (
  type,
  level,
  selection,
  className,
  onClick = () => {},
  onHoverChange = () => {},
) => {
  level = level.toUpperCase();
  const iconDict = {
    luxLevel: {
      unselected: {
        LOW: i.luxUnselectedLow,
        MEDIUM: i.luxUnselectedMedium,
        HIGH: i.luxUnselectedHigh,
      },
      selected: {
        LOW: i.luxSelectedLow,
        MEDIUM: i.luxSelectedMedium,
        HIGH: i.luxSelectedHigh,
      },
    },
    waterCycle: {
      unselected: {
        LOW: i.cycleUnselectedLow,
        MEDIUM: i.cycleUnselectedMedium,
        HIGH: i.cycleUnselectedHigh,
      },
      selected: {
        LOW: i.cycleSelectedLow,
        MEDIUM: i.cycleSelectedMedium,
        HIGH: i.cycleSelectedHigh,
      },
    },
  };
  const icon = iconDict[type][selection][level];
  return (
    <img
      src={icon}
      id={`${type}:${level}`}
      alt={`${type}:${level}`}
      className={className}
      onClick={onClick}
      onMouseEnter={onHoverChange}
      onMouseLeave={onHoverChange}
    />
  );
};
