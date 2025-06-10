import React from 'react';
import { GanttChartItem } from '../types/scheduling';

interface GanttChartProps {
  ganttChart: GanttChartItem[];
}

export function GanttChart({ ganttChart }: GanttChartProps) {
  if (ganttChart.length === 0) return null;

  const maxTime = Math.max(...ganttChart.map(item => item.endTime));
  const timeScale = Math.max(800 / maxTime, 20); // Minimum 20px per unit

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Gantt Chart</h2>
      
      <div className="overflow-x-auto">
        <div className="relative" style={{ minWidth: `${maxTime * timeScale + 100}px` }}>
          {/* Process bars */}
          <div className="flex items-center mb-4" style={{ height: '60px' }}>
            {ganttChart.map((item, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center text-white font-medium text-sm border-r-2 border-white"
                style={{
                  backgroundColor: item.color,
                  width: `${(item.endTime - item.startTime) * timeScale}px`,
                  height: '50px'
                }}
              >
                {item.processName}
              </div>
            ))}
          </div>
          
          {/* Time markers */}
          <div className="flex relative">
            {ganttChart.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className="text-sm text-gray-600 border-l border-gray-300 pl-1"
                  style={{ width: `${(item.endTime - item.startTime) * timeScale}px` }}
                >
                  {item.startTime}
                </div>
              </React.Fragment>
            ))}
            <div className="text-sm text-gray-600 border-l border-gray-300 pl-1">
              {maxTime}
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4">
        {Array.from(new Set(ganttChart.map(item => item.processName))).map((processName, index) => {
          const color = ganttChart.find(item => item.processName === processName)?.color;
          return (
            <div key={processName} className="flex items-center">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-sm text-gray-700">{processName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}