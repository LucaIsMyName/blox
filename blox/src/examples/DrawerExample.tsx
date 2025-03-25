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
    <div className="my-5">
      <h2 className="text-2xl font-bold mb-6">Drawer Examples</h2>
      <div className="flex flex-col gap-4">
        {/* Right Drawer Example */}
        <div className="mb-4">
          <button
            onClick={() => setIsRightOpen(true)}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
            Open Right Drawer
          </button>
          <Drawer
            isOpen={isRightOpen}
            onClose={() => setIsRightOpen(false)}
            placement="right">
            <Drawer.Header className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Right Drawer</h3>
            </Drawer.Header>
            <Drawer.Body className="p-4">
              <p className="mb-3">This is a drawer that slides in from the right side.</p>
              <p>Drawers are great for navigation menus, filters, or settings panels.</p>
            </Drawer.Body>
            <Drawer.Footer className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsRightOpen(false)}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
                Close
              </button>
            </Drawer.Footer>
          </Drawer>
        </div>

        {/* Left Drawer Example */}
        <div className="mb-4">
          <button
            onClick={() => setIsLeftOpen(true)}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
            Open Left Drawer
          </button>
          <Drawer
            isOpen={isLeftOpen}
            onClose={() => setIsLeftOpen(false)}
            placement="left">
            <Drawer.Header className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Left Drawer</h3>
            </Drawer.Header>
            <Drawer.Body className="p-4">
              <p className="mb-3">This drawer slides in from the left side.</p>
              <p className="mb-3">Left drawers are commonly used for navigation menus in applications.</p>
              <nav className="mt-6">
                <ul className="list-none p-0">
                  <li className="mb-3">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLeftOpen(false);
                      }}>
                      Home
                    </a>
                  </li>
                  <li className="mb-3">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLeftOpen(false);
                      }}>
                      Dashboard
                    </a>
                  </li>
                  <li className="mb-3">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
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
                      className="text-blue-600 hover:text-blue-800 transition-colors"
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
        <div className="mb-4">
          <button
            onClick={() => setIsTopOpen(true)}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
            Open Top Drawer
          </button>
          <Drawer
            isOpen={isTopOpen}
            onClose={() => setIsTopOpen(false)}
            placement="top"
            minHeight="200px">
            <Drawer.Header className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Top Drawer</h3>
            </Drawer.Header>
            <Drawer.Body className="p-4">
              <p className="mb-3">This drawer slides in from the top of the screen.</p>
              <p>Top drawers can be used for notifications, alerts, or search interfaces.</p>
            </Drawer.Body>
            <Drawer.Footer className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsTopOpen(false)}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
                Close
              </button>
            </Drawer.Footer>
          </Drawer>
        </div>

        {/* Bottom Drawer Example */}
        <div className="mb-4">
          <button
            onClick={() => setIsBottomOpen(true)}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
            Open Bottom Drawer
          </button>
          <Drawer
            isOpen={isBottomOpen}
            onClose={() => setIsBottomOpen(false)}
            placement="bottom"
            minHeight="200px">
            <Drawer.Header className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Bottom Drawer</h3>
            </Drawer.Header>
            <Drawer.Body className="p-4">
              <p className="mb-3">This drawer slides in from the bottom of the screen.</p>
              <p>Bottom drawers are often used for mobile interfaces, action sheets, or additional controls.</p>
            </Drawer.Body>
            <Drawer.Footer className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsBottomOpen(false)}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
                Close
              </button>
            </Drawer.Footer>
          </Drawer>
        </div>

        {/* Custom Styled Drawer Example */}
        <div className="mb-4">
          <button
            onClick={() => setIsCustomOpen(true)}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
            Open Custom Styled Drawer
          </button>
          <Drawer
            isOpen={isCustomOpen}
            onClose={() => setIsCustomOpen(false)}
            placement="right"
            backdropClassName="bg-purple-900/20 backdrop-blur-sm"
            contentClassName="w-[350px] bg-purple-50 shadow-lg border-l border-purple-200"
            closeButton={<span className="text-xl text-gray-600 hover:text-gray-800">✕</span>}>
            <div className="p-5">
              <h3 className="text-lg font-medium mb-4">Custom Drawer</h3>
              <p className="mb-3">This drawer uses custom styling with Tailwind classes.</p>
              <p className="mb-5">You can customize the appearance of the drawer using Tailwind utility classes.</p>
              <div>
                <button
                  onClick={() => setIsCustomOpen(false)}
                  className="mt-5 px-4 py-2 bg-purple-600 text-white rounded border-none hover:bg-purple-700 transition-colors">
                  Close Drawer
                </button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>

      {/* Add global styles for drawer components */}
      <style
        jsx
        global>{`
        [data-blox-drawer-close] {
          @apply absolute top-3 right-3 bg-transparent border-none text-lg cursor-pointer text-gray-600 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100;
        }
      `}</style>
    </div>
  );
};

export default DrawerExample;
