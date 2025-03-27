// ContextMenu.tsx
import React, { useState, useRef, useEffect, createContext, useContext, useCallback, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { ContextMenuProps, ContextMenuTriggerProps, ContextMenuContentProps, ContextMenuItemProps, ContextMenuGroupProps, ContextMenuSeparatorProps, ContextMenuContextValue, ContextMenuComposition } from "./types";

// Create context for context menu state
const ContextMenuContext = createContext<ContextMenuContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
  position: { x: 0, y: 0 },
  disabled: false,
});

// Hook to use context menu context
const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("useContextMenu must be used within a ContextMenu component");
  }
  return context;
};

// ContextMenu Trigger Component
const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({ children, disabled = false, className = "", ...props }) => {
  const { open, disabled: contextDisabled } = useContextMenu();
  const isDisabled = disabled || contextDisabled;

  const handleContextMenu = (event: React.MouseEvent) => {
    if (isDisabled) return;

    // Prevent the default context menu
    event.preventDefault();

    // Open our custom context menu
    open(event);
  };

  return (
    <div
      className={`blox-context-menu-trigger ${className}`}
      data-blox-context-menu-trigger=""
      data-disabled={isDisabled ? "true" : "false"}
      onContextMenu={handleContextMenu}
      {...props}>
      {children}
    </div>
  );
};

// ContextMenu Content Component
const ContextMenuContent: React.FC<ContextMenuContentProps> = ({ children, closeOnOutsideClick = true, closeOnEscape = true, offset = [0, 0], width, maxHeight, className = "", ...props }) => {
  const { isOpen, close, position } = useContextMenu();
  const menuRef = useRef<HTMLDivElement>(null);

  // Create a ref to store calculated styles to avoid re-renders
  const styleRef = useRef({
    left: "0px",
    top: "0px",
    zIndex: 1000,
    width: width,
    maxHeight: maxHeight,
    overflow: maxHeight ? "auto" : undefined,
  });

  // Calculate position only once when menu opens or position changes
  useLayoutEffect(() => {
    if (!isOpen) return;

    // Initial position based on cursor + offset
    let x = position.x + offset[0];
    let y = position.y + offset[1];

    // After one frame, adjust if needed
    requestAnimationFrame(() => {
      if (!menuRef.current) return;

      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Check if menu would go off the right edge
      if (x + menuRect.width > viewportWidth) {
        x = viewportWidth - menuRect.width - 5; // 5px buffer
      }

      // Check if menu would go off the bottom edge
      if (y + menuRect.height > viewportHeight) {
        y = viewportHeight - menuRect.height - 5; // 5px buffer
      }

      // Ensure menu doesn't go off the left or top edges
      x = Math.max(5, x);
      y = Math.max(5, y);

      // Apply directly to the DOM element to avoid re-renders
      if (menuRef.current) {
        menuRef.current.style.left = `${x}px`;
        menuRef.current.style.top = `${y}px`;
      }
    });

    // Store initial position in style ref
    styleRef.current = {
      ...styleRef.current,
      left: `${position.x + offset[0]}px`,
      top: `${position.y + offset[1]}px`,
    };
  }, [isOpen, position.x, position.y, offset[0], offset[1]]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, close, closeOnOutsideClick]);

  // Close menu when pressing Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close, closeOnEscape]);

  if (!isOpen) return null;

  // Render the menu with Portal
  return createPortal(
    <div
      ref={menuRef}
      className={`blox-context-menu-content ${className}`}
      data-blox-context-menu-content=""
      style={{
        position: "fixed",
        ...styleRef.current,
      }}
      role="menu"
      aria-orientation="vertical"
      {...props}>
      {children}
    </div>,
    document.body
  );
};

// ContextMenu Item Component
const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ children, disabled = false, onSelect, closeOnSelect = true, icon, shortcut, className = "", ...props }) => {
  const { close } = useContextMenu();

  const handleClick = () => {
    if (disabled) return;

    if (onSelect) {
      onSelect();
    }

    if (closeOnSelect) {
      close();
    }
  };

  return (
    <div
      className={`blox-context-menu-item ${className}`}
      data-blox-context-menu-item=""
      data-disabled={disabled ? "true" : "false"}
      onClick={handleClick}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}>
      {icon && (
        <span
          className="blox-context-menu-item-icon"
          data-blox-context-menu-item-icon="">
          {icon}
        </span>
      )}

      <span
        className="blox-context-menu-item-label"
        data-blox-context-menu-item-label="">
        {children}
      </span>

      {shortcut && (
        <span
          className="blox-context-menu-item-shortcut"
          data-blox-context-menu-item-shortcut="">
          {shortcut}
        </span>
      )}
    </div>
  );
};

// ContextMenu Group Component
const ContextMenuGroup: React.FC<ContextMenuGroupProps> = ({ children, label, className = "", ...props }) => {
  return (
    <div
      className={`blox-context-menu-group ${className}`}
      data-blox-context-menu-group=""
      role="group"
      aria-label={label}
      {...props}>
      {label && (
        <div
          className="blox-context-menu-group-label"
          data-blox-context-menu-group-label="">
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

// ContextMenu Separator Component
const ContextMenuSeparator: React.FC<ContextMenuSeparatorProps> = ({ className = "", ...props }) => {
  return (
    <div
      className={`blox-context-menu-separator ${className}`}
      data-blox-context-menu-separator=""
      role="separator"
      {...props}
    />
  );
};

// Main ContextMenu Component
const ContextMenu: React.FC<ContextMenuProps> & ContextMenuComposition = ({ children, onOpen, onClose, disabled = false, enableKeyboard = true, ...props }) => {
  // State for tracking open state and position
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Open the context menu
  const open = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled) return;

      if ("clientX" in event) {
        setPosition({ x: event.clientX, y: event.clientY });
      }

      setIsOpen(true);

      if (onOpen) {
        onOpen(event);
      }
    },
    [disabled, onOpen]
  );

  // Close the context menu
  const close = useCallback(() => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Implement keyboard shortcuts to open the context menu if desired
      // For example, Shift+F10 or the context menu key
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enableKeyboard]);

  // Context value
  const contextValue = {
    isOpen,
    open,
    close,
    position,
    disabled,
  };

  return (
    <ContextMenuContext.Provider value={contextValue}>
      <div
        className="blox-context-menu"
        data-blox-context-menu=""
        data-state={isOpen ? "open" : "closed"}
        {...props}>
        {children}
      </div>
    </ContextMenuContext.Provider>
  );
};

// Attach sub-components
ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;
ContextMenu.Group = ContextMenuGroup;
ContextMenu.Separator = ContextMenuSeparator;

export default ContextMenu;
