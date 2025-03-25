// ModalExample.tsx
import React, { useState } from "react";
import { Modal } from "../components/Modal";

export const ModalExample: React.FC = () => {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [isCompoundOpen, setIsCompoundOpen] = useState(false);

  return (
    <div className="modal-examples">
      <h2>Modal Examples</h2>
      <div className="examples-container">
        {/* Basic Modal */}
        <div className="example-item">
          <button onClick={() => setIsBasicOpen(true)}>Open Basic Modal</button>
          <Modal
            isOpen={isBasicOpen}
            onClose={() => setIsBasicOpen(false)}
            title="Basic Modal"
            footer={
              <>
                <button
                  onClick={() => setIsBasicOpen(false)}
                  style={{ marginRight: "8px" }}>
                  Cancel
                </button>
                <button
                  onClick={() => setIsBasicOpen(false)}
                  className="bg-green-500 text-white border-black">
                  Confirm
                </button>
              </>
            }>
            <p>This is a basic modal with a title and footer buttons.</p>
            <p>Modal components can be easily customized using CSS variables.</p>
          </Modal>
        </div>

        {/* Custom Styled Modal */}
        <div className="example-item">
          <button onClick={() => setIsCustomOpen(true)}>Open Custom Styled Modal</button>
          <Modal
            isOpen={isCustomOpen}
            onClose={() => setIsCustomOpen(false)}
            title="Custom Styled Modal"
            size="small"
            contentClassName="custom-modal">
            <p>This modal has custom styling applied via the contentClassName.</p>
            <button
              onClick={() => setIsCustomOpen(false)}
              style={{
                backgroundColor: "#f56565",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
              }}>
              Close
            </button>
          </Modal>
        </div>

        {/* Full-width Modal */}
        <div className="example-item">
          <button onClick={() => setIsFullOpen(true)}>Open Full Width Modal</button>
          <Modal
            isOpen={isFullOpen}
            onClose={() => setIsFullOpen(false)}
            title="Full Width Modal"
            size="full">
            <p>This modal uses the full width of the screen (with margins).</p>
            <p>It's useful for displaying large amounts of content or complex interfaces.</p>
            <button
              onClick={() => setIsFullOpen(false)}
              style={{
                marginTop: "16px",
                padding: "8px 16px",
              }}>
              Close
            </button>
          </Modal>
        </div>

        {/* Compound Modal using subcomponents */}
        <div className="example-item">
          <button onClick={() => setIsCompoundOpen(true)}>Open Compound Modal</button>
          <Modal
            isOpen={isCompoundOpen}
            onClose={() => setIsCompoundOpen(false)}
            size="large">
            <Modal.Header>
              <h3 style={{ margin: 0 }}>Compound Modal Example</h3>
              <Modal.CloseButton onClose={() => setIsCompoundOpen(false)} />
            </Modal.Header>
            <Modal.Body>
              <p>This modal uses the compound component pattern.</p>
              <p>You can construct more complex layouts using Modal.Header, Modal.Body, and Modal.Footer subcomponents.</p>
              <div
                style={{
                  backgroundColor: "#f3f4f6",
                  padding: "16px",
                  borderRadius: "4px",
                  marginTop: "16px",
                }}>
                <h4>Custom Section</h4>
                <p>You can add any content you want here.</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setIsCompoundOpen(false)}
                style={{ marginRight: "8px" }}>
                Cancel
              </button>
              <button
                onClick={() => setIsCompoundOpen(false)}
                style={{
                  backgroundColor: "#4f46e5",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                }}>
                Save Changes
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      {/* Example styles */}
      <style>{`
        .modal-examples {
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
        
        /* Custom modal styling using CSS custom properties */
        .custom-modal {
          --blox-modal-bg: #2d3748;
          --blox-modal-title-color: white;
          --blox-modal-border-radius: 8px;
          --blox-modal-box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ModalExample;
