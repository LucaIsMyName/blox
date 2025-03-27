// ContextMenuExample.tsx
import React, { useState } from "react";
import { ContextMenu } from "../components/ContextMenu";

export const ContextMenuExample: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [textSize, setTextSize] = useState<string>("medium");

  const handleCopy = () => {
    setSelectedAction("Copied to clipboard");
    // In a real app, you would implement actual copy functionality
  };

  const handleCut = () => {
    setSelectedAction("Cut to clipboard");
    // In a real app, you would implement actual cut functionality
  };

  const handlePaste = () => {
    setSelectedAction("Pasted from clipboard");
    // In a real app, you would implement actual paste functionality
  };

  const handleDelete = () => {
    setSelectedAction("Deleted");
    // In a real app, you would implement actual delete functionality
  };

  const handleTextSize = (size: string) => {
    setTextSize(size);
    setSelectedAction(`Text size set to ${size}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">ContextMenu Example</h2>

      <div className="mb-6">
        <p className="text-gray-600 mb-2">Right-click on the areas below to open context menus:</p>
        {selectedAction && <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded">Last action: {selectedAction}</div>}
      </div>

      <div className="space-y-6">
        {/* Basic Context Menu */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Basic Context Menu</h3>

          <ContextMenu>
            <ContextMenu.Trigger className="bg-gray-100 p-6 rounded-md text-center cursor-context-menu">Right-click here for basic menu</ContextMenu.Trigger>

            <ContextMenu.Content className="min-w-[200px] bg-white shadow-lg rounded-md py-1 border border-gray-200">
              <ContextMenu.Item
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onSelect={() => setSelectedAction("New file created")}>
                New File
              </ContextMenu.Item>
              <ContextMenu.Item
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onSelect={() => setSelectedAction("New folder created")}>
                New Folder
              </ContextMenu.Item>
              <ContextMenu.Separator className="my-1 border-t border-gray-200" />
              <ContextMenu.Item
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onSelect={() => setSelectedAction("Settings opened")}>
                Settings
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>

        {/* Context Menu with Icons and Shortcuts */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">With Icons and Shortcuts</h3>

          <ContextMenu>
            <ContextMenu.Trigger className="bg-gray-100 p-6 rounded-md text-center cursor-context-menu">Right-click for edit menu</ContextMenu.Trigger>

            <ContextMenu.Content className="min-w-[220px] bg-white shadow-lg rounded-md py-1 border border-gray-200">
              <ContextMenu.Item
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                onSelect={handleCopy}
                icon={
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                }
                shortcut="⌘C">
                Copy
              </ContextMenu.Item>

              <ContextMenu.Item
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                onSelect={handleCut}
                icon={
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <circle
                      cx="6"
                      cy="6"
                      r="3"></circle>
                    <circle
                      cx="6"
                      cy="18"
                      r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                }
                shortcut="⌘X">
                Cut
              </ContextMenu.Item>

              <ContextMenu.Item
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                onSelect={handlePaste}
                icon={
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect
                      x="8"
                      y="2"
                      width="8"
                      height="4"
                      rx="1"
                      ry="1"></rect>
                  </svg>
                }
                shortcut="⌘V">
                Paste
              </ContextMenu.Item>

              <ContextMenu.Separator className="my-1 border-t border-gray-200" />

              <ContextMenu.Item
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center justify-between"
                onSelect={handleDelete}
                icon={
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line
                      x1="10"
                      y1="11"
                      x2="10"
                      y2="17"></line>
                    <line
                      x1="14"
                      y1="11"
                      x2="14"
                      y2="17"></line>
                  </svg>
                }
                shortcut="⌫">
                Delete
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        </div>

        {/* Context Menu with Sub-menus */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">With Groups and Disabled Items</h3>

          <ContextMenu>
            <ContextMenu.Trigger className="bg-gray-100 p-6 rounded-md text-center cursor-context-menu">
              <span
                className={`
                ${textSize === "small" ? "text-sm" : textSize === "medium" ? "text-base" : textSize === "large" ? "text-lg" : "text-xl"}
              `}>
                Right-click to format text (current size: {textSize})
              </span>
            </ContextMenu.Trigger>

            <ContextMenu.Content className="min-w-[200px] bg-white shadow-lg rounded-md py-1 border border-gray-200">
              <ContextMenu.Group
                label="Edit"
                className="px-3 py-1 text-xs text-gray-500 uppercase">
                <ContextMenu.Item
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onSelect={handleCopy}>
                  Copy
                </ContextMenu.Item>
                <ContextMenu.Item
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onSelect={handlePaste}>
                  Paste
                </ContextMenu.Item>
              </ContextMenu.Group>

              <ContextMenu.Separator className="my-1 border-t border-gray-200" />

              <ContextMenu.Group
                label="Format"
                className="px-3 py-1 text-xs text-gray-500 uppercase">
                <ContextMenu.Item
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onSelect={() => handleTextSize("small")}>
                  Small Text
                </ContextMenu.Item>
                <ContextMenu.Item
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onSelect={() => handleTextSize("medium")}>
                  Medium Text
                </ContextMenu.Item>
                <ContextMenu.Item
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onSelect={() => handleTextSize("large")}>
                  Large Text
                </ContextMenu.Item>
                <ContextMenu.Item
                  className="px-4 py-2 text-sm opacity-50 cursor-not-allowed"
                  disabled>
                  Premium Feature (Disabled)
                </ContextMenu.Item>
              </ContextMenu.Group>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      </div>
    </div>
  );
};

export default ContextMenuExample;
