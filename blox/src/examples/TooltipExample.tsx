import React, { useState } from 'react';
import { Tooltip } from '../components/Tooltip';
import { Button } from '../components/Button';

export const TooltipExample: React.FC = () => {
  const [controlledIsOpen, setControlledIsOpen] = useState(false);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">Tooltip Component</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Basic Tooltip</h3>
          <div className="flex justify-center p-12">
            <Tooltip 
              content={
                <div className="bg-gray-800 text-white px-3 py-2 rounded max-w-xs">
                  This is a basic tooltip
                </div>
              } 
              tooltipClassName="animate-fadeIn"
            >
              <Button>Hover me</Button>
            </Tooltip>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Placement Options</h3>
          <div className="grid grid-cols-3 gap-4 place-items-center p-12">
            <Tooltip
              content={
                <div className="bg-gray-800 text-white px-3 py-2 rounded max-w-xs">
                  Top tooltip
                </div>
              }
              placement="top"
              tooltipClassName=""
            >
              <Button size="sm">Top</Button>
            </Tooltip>
            
            <Tooltip
              content={
                <div className="bg-gray-800 text-white px-3 py-2 rounded max-w-xs">
                  Right tooltip
                </div>
              }
              placement="right"
              tooltipClassName="animate-fadeIn"
            >
              <Button size="sm">Right</Button>
            </Tooltip>
            
            <Tooltip
              content={
                <div className="bg-gray-800 text-white px-3 py-2 rounded max-w-xs">
                  Bottom tooltip
                </div>
              }
              placement="bottom"
              tooltipClassName="animate-fadeIn"
            >
              <Button size="sm">Bottom</Button>
            </Tooltip>
            
            <Tooltip
              content={
                <div className="bg-gray-800 text-white px-3 py-2 rounded max-w-xs">
                  Left tooltip
                </div>
              }
              placement="left"
              tooltipClassName="animate-fadeIn"
            >
              <Button size="sm">Left</Button>
            </Tooltip>
            
            <Tooltip
              content={
                <div className="bg-gray-800 text-white px-3 py-2 rounded max-w-xs">
                  Top-Start tooltip
                </div>
              }
              placement="top-start"
              tooltipClassName="animate-fadeIn"
            >
              <Button size="sm">Top-Start</Button>
            </Tooltip>
            
            <Tooltip
              content={
                <div className="bg-gray-800 text-white px-3 py-2 rounded max-w-xs">
                  Bottom-End tooltip
                </div>
              }
              placement="bottom-end"
              tooltipClassName="animate-fadeIn"
            >
              <Button size="sm">Bottom-End</Button>
            </Tooltip>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Custom Styling</h3>
          <div className="flex justify-center p-8">
            <Tooltip
              content={
                <div className="bg-blue-600 text-white px-3 py-2 rounded shadow-lg max-w-xs">
                  This tooltip has custom styling
                </div>
              }
              tooltipClassName="animate-fadeIn"
            >
              <Button variant="primary">Custom Style</Button>
            </Tooltip>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Delay and Interactive</h3>
          <div className="flex justify-center p-8">
            <Tooltip
              content={
                <div className="bg-purple-600 text-white px-3 py-2 rounded shadow-lg max-w-xs">
                  <p>Interactive tooltip with delay</p>
                  <button className="mt-2 px-2 py-1 bg-white text-purple-600 rounded text-sm font-medium">
                    Click me
                  </button>
                </div>
              }
              showDelay={300}
              hideDelay={200}
              interactive={true}
              tooltipClassName="animate-fadeIn"
            >
              <Button variant="secondary">Delayed & Interactive</Button>
            </Tooltip>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Controlled Tooltip</h3>
          <div className="flex justify-center items-center gap-4 p-8">
            <Button onClick={() => setControlledIsOpen(!controlledIsOpen)}>
              {controlledIsOpen ? 'Hide Tooltip' : 'Show Tooltip'}
            </Button>
            
            <Tooltip
              content={
                <div className="bg-green-600 text-white px-3 py-2 rounded shadow-lg max-w-xs">
                  This tooltip is controlled programmatically
                </div>
              }
              isOpen={controlledIsOpen}
              tooltipClassName="animate-fadeIn"
            >
              <span className="border border-dashed border-gray-400 p-2 rounded">
                Controlled Target
              </span>
            </Tooltip>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Tooltip Inside Container</h3>
          <div className="relative h-40 border border-gray-300 rounded overflow-auto p-4">
            <div className="h-60 flex items-center justify-center">
              <Tooltip
                content={
                  <div className="bg-orange-500 text-white px-3 py-2 rounded shadow-lg max-w-xs">
                    This tooltip adjusts to stay in viewport even in scrollable containers
                  </div>
                }
                tooltipClassName="animate-fadeIn"
              >
                <Button>Scroll to test</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooltipExample;