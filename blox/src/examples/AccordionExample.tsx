/**
 * @file AccordionExample.tsx
 * @description
 * A simple example of using the Accordion component.
 * This example demonstrates basic usage, multiple expand, controlled accordion, disabled items, and custom styling.
 */
import React, { useState } from "react";
import { Accordion } from "../components/Accordion";

export const AccordionExample: React.FC = () => {
  // For controlled accordion example
  const [activeIndices, setActiveIndices] = useState<number[]>([0]);

  return (
    <div className="accordion-examples">
      <h2>Accordion Examples</h2>

      <div className="example-section">
        <h3>Basic Accordion (single expand)</h3>
        <Accordion defaultIndex={0}>
          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>What is Blox UI?</span>
                <span className="accordion-icon">+</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>Blox UI is a headless component library for React that provides unstyled, accessible components that can be easily customized with your own styles.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>How do I style components?</span>
                <span className="accordion-icon">+</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>You can style components using:</p>
                <ul>
                  <li>CSS custom properties (variables)</li>
                  <li>CSS classes</li>
                  <li>Data attributes for targeted styling</li>
                  <li>Direct style props</li>
                </ul>
              </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>Is Blox UI accessible?</span>
                <span className="accordion-icon">+</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>Yes! Blox UI components are built with accessibility in mind, following WAI-ARIA guidelines.</p>
                <p>Each component includes appropriate ARIA attributes and keyboard navigation support.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="example-section">
        <h3>Multiple Expand Accordion</h3>
        <Accordion
          allowMultiple
          defaultIndex={[0, 2]}>
          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>First Item</span>
                <span className="accordion-icon">↓</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>Content for the first item.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>Second Item</span>
                <span className="accordion-icon">↓</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>Content for the second item.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>Third Item</span>
                <span className="accordion-icon">↓</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>Content for the third item.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="example-section">
        <h3>Controlled Accordion</h3>
        <p>Active indices: {JSON.stringify(activeIndices)}</p>
        <Accordion
          activeIndices={activeIndices}
          onChange={setActiveIndices}
          allowMultiple>
          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>First Controlled Item</span>
                <span className="accordion-icon">⇅</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>This is a controlled accordion item.</p>
                <button
                  onClick={() => setActiveIndices([])}
                  className="control-button">
                  Close All
                </button>
              </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>Second Controlled Item</span>
                <span className="accordion-icon">⇅</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>This is another controlled accordion item.</p>
                <button
                  onClick={() => setActiveIndices([0, 1, 2])}
                  className="control-button">
                  Open All
                </button>
              </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>Third Controlled Item</span>
                <span className="accordion-icon">⇅</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>This is the third controlled accordion item.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="example-section">
        <h3>Disabled Item</h3>
        <Accordion>
          <Accordion.Item>
            <Accordion.Button>
              <div className="accordion-header">
                <span>Enabled Item</span>
                <span className="accordion-icon">+</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>This item can be toggled.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item isDisabled>
            <Accordion.Button>
              <div className="accordion-header">
                <span>Disabled Item</span>
                <span className="accordion-icon">+</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="accordion-content">
                <p>This content won't be displayed because the item is disabled.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="example-section">
        <h3>Custom Styled Accordion</h3>
        <Accordion className="custom-accordion">
          <Accordion.Item>
            <Accordion.Button>
              <div className="custom-header">
                <span>Custom Styling</span>
                <span className="custom-icon">▼</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="custom-content">
                <p>This accordion uses custom styling using CSS variables and data attributes.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Button>
              <div className="custom-header">
                <span>More Options</span>
                <span className="custom-icon">▼</span>
              </div>
            </Accordion.Button>
            <Accordion.Panel>
              <div className="custom-content">
                <p>You can completely customize the appearance while maintaining functionality.</p>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Styles for the examples */}
      <style>{`
        .accordion-examples {
          margin: 20px 0;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .example-section {
          margin-bottom: 40px;
        }
        
        .example-section h3 {
          margin-bottom: 16px;
        }
        
        /* Basic accordion styling */
        [data-blox-accordion] {
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        
        [data-blox-accordion-item] {
          border-bottom: 1px solid #e0e0e0;
        }
        
        [data-blox-accordion-item]:last-child {
          border-bottom: none;
        }
        
        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 16px;
        }
        
        [data-blox-accordion-button] {
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }
        
        [data-blox-accordion-button]:hover {
          background-color: #f5f5f5;
        }
        
        [data-blox-accordion-button][data-active="true"] .accordion-icon {
          transform: rotate(45deg);
        }
        
        .accordion-icon {
          transition: transform 0.2s ease;
        }
        
        .accordion-content {
          padding: 16px;
        }
        
        /* Disabled state */
        [data-blox-accordion-button][data-disabled="true"] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* Control buttons */
        .control-button {
          margin-top: 8px;
          padding: 6px 12px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .control-button:hover {
          background-color: #e0e0e0;
        }
        
        /* Custom styled accordion */
        .custom-accordion {
          --accordion-bg: #f9f6fd;
          --accordion-border: #c5c0db;
          --accordion-active-bg: #e9e4f9;
          --accordion-text: #4a3d81;
          
          background-color: var(--accordion-bg);
          border: 1px solid var(--accordion-border);
          border-radius: 8px;
        }
        
        .custom-accordion [data-blox-accordion-item] {
          border-bottom: 1px solid var(--accordion-border);
        }
        
        .custom-accordion [data-blox-accordion-button] {
          color: var(--accordion-text);
        }
        
        .custom-accordion [data-blox-accordion-button][data-active="true"] {
          background-color: var(--accordion-active-bg);
        }
        
        .custom-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 14px 16px;
          font-weight: 500;
        }
        
        .custom-icon {
          transition: transform 0.3s ease;
        }
        
        .custom-accordion [data-blox-accordion-button][data-active="true"] .custom-icon {
          transform: rotate(180deg);
        }
        
        .custom-content {
          padding: 16px;
          background-color: white;
          border-radius: 0 0 6px 6px;
        }
      `}</style>
    </div>
  );
};

export default AccordionExample;
