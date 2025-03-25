// DrawerExample.tsx
import React, { useState } from "react";
import { Drawer } from "../components/Drawer";

export const DrawerExample: React.FC = () => {
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isTopOpen, setIsTopOpen] = useState(false);
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  return (
    <div className="drawer-examples">
      <h2>Drawer Examples</h2>
      <div className="examples-container">
        {/* Right Drawer Example */}
        <div className="example-item">
          <button onClick={() => setIsRightOpen(true)}>Open Right Drawer</button>
          <Drawer
            isOpen={isRightOpen}
            onClose={() => setIsRightOpen(false)}
            placement="right">
            <Drawer.Header>
              <h3>Right Drawer</h3>
            </Drawer.Header>
            <Drawer.Body>
              <p>This is a drawer that slides in from the right side.</p>
              <p>Drawers are great for navigation menus, filters, or settings panels.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <button onClick={() => setIsRightOpen(false)}>Close</button>
            </Drawer.Footer>
          </Drawer>
        </div>

        {/* Left Drawer Example */}
        <div className="example-item">
          <button onClick={() => setIsLeftOpen(true)}>Open Left Drawer</button>
          <Drawer
            isOpen={isLeftOpen}
            onClose={() => setIsLeftOpen(false)}
            placement="left">
            <Drawer.Header>
              <h3>Left Drawer</h3>
            </Drawer.Header>
            <Drawer.Body>
              <p>This drawer slides in from the left side.</p>
              <p>Left drawers are commonly used for navigation menus in applications.</p>
              <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLeftOpen(false);
                      }}>
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLeftOpen(false);
                      }}>
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLeftOpen(false);
                      }}>
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLeftOpen(false);
                      }}>
                      Profile
                    </a>
                  </li>
                </ul>
              </nav>
            </Drawer.Body>
          </Drawer>
        </div>

        {/* Top Drawer Example */}
        <div className="example-item">
          <button onClick={() => setIsTopOpen(true)}>Open Top Drawer</button>
          <Drawer
            isOpen={isTopOpen}
            onClose={() => setIsTopOpen(false)}
            placement="top"
            minHeight="200px">
            <Drawer.Header>
              <h3>Top Drawer</h3>
            </Drawer.Header>
            <Drawer.Body>
              <p>This drawer slides in from the top of the screen.</p>
              <p>Top drawers can be used for notifications, alerts, or search interfaces.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <button onClick={() => setIsTopOpen(false)}>Close</button>
            </Drawer.Footer>
          </Drawer>
        </div>

        {/* Bottom Drawer Example */}
        <div className="example-item">
          <button onClick={() => setIsBottomOpen(true)}>Open Bottom Drawer</button>
          <Drawer
            isOpen={isBottomOpen}
            onClose={() => setIsBottomOpen(false)}
            placement="bottom"
            minHeight="200px">
            <Drawer.Header>
              <h3>Bottom Drawer</h3>
            </Drawer.Header>
            <Drawer.Body>
              <p>This drawer slides in from the bottom of the screen.</p>
              <p>Bottom drawers are often used for mobile interfaces, action sheets, or additional controls.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <button onClick={() => setIsBottomOpen(false)}>Close</button>
            </Drawer.Footer>
          </Drawer>
        </div>

        {/* Custom Styled Drawer Example */}
        <div className="example-item">
          <button onClick={() => setIsCustomOpen(true)}>Open Custom Styled Drawer</button>
          <Drawer
            isOpen={isCustomOpen}
            onClose={() => setIsCustomOpen(false)}
            placement="right"
            contentClassName="custom-drawer"
            closeButton={<span>✕</span>}>
            <div style={{ padding: "20px" }}>
              <h3>Custom Drawer</h3>
              <p>This drawer uses custom styling with CSS variables.</p>
              <p>You can customize the appearance of the drawer using CSS variables or by adding your own class names.</p>
              <div>
                <button
                  onClick={() => setIsCustomOpen(false)}
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#6200ee",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                  }}>
                  Close Drawer
                </button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>

      {/* Styles for the examples */}
      <style>{`
        .drawer-examples {
          margin: 20px 0;
        }
        
        .examples-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .example-item {
          margin-bottom: 16px;
        }
        
        button {
          padding: 8px 16px;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }
        
        button:hover {
          background-color: #e0e0e0;
        }
        
        /* Custom drawer styling */
        .custom-drawer {
          --blox-drawer-content-bg-color: #f9f6fd;
          --blox-drawer-backdrop-color: rgba(98, 0, 238, 0.2);
          --blox-drawer-backdrop-blur: 2px;
          width: 350px;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          border-left: 1px solid #e0e0e0;
        }
        
        /* Example of global drawer styling */
        :root {
          --blox-drawer-content-bg-color: white;
          --blox-drawer-backdrop-color: rgba(0, 0, 0, 0.5);
          --blox-drawer-backdrop-blur: 0px;
        }
        
        [data-blox-drawer-header] {
          padding: 16px;
          border-bottom: 1px solid #eee;
        }
        
        [data-blox-drawer-body] {
          padding: 16px;
        }
        
        [data-blox-drawer-footer] {
          padding: 16px;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: flex-end;
        }
        
        [data-blox-drawer-close] {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        [data-blox-drawer-close]:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default DrawerExample;
