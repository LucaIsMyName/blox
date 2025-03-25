// TabsExample.tsx
import React, { useState } from "react";
import { Tabs } from "../components/Tabs";

export const TabsExample: React.FC = () => {
  // For controlled tabs example
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div className="tabs-examples">
      <h2>Tabs Examples</h2>

      <div className="example-section">
        <h3>Basic Tabs (Uncontrolled)</h3>
        <Tabs
          defaultActiveTab="home"
          className="basic-tabs">
          <Tabs.List className="basic-tab-list">
            <Tabs.Tab
              id="home"
              className="basic-tab">
              Home
            </Tabs.Tab>
            <Tabs.Tab
              id="profile"
              className="basic-tab">
              Profile
            </Tabs.Tab>
            <Tabs.Tab
              id="settings"
              className="basic-tab">
              Settings
            </Tabs.Tab>
            <Tabs.Tab
              id="disabled"
              disabled
              className="basic-tab">
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels className="basic-tab-panels">
            <Tabs.Panel
              tabId="home"
              className="basic-tab-panel">
              <h4>Home Content</h4>
              <p>This is the home tab content.</p>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="profile"
              className="basic-tab-panel">
              <h4>Profile Content</h4>
              <p>This is the profile tab content.</p>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="settings"
              className="basic-tab-panel">
              <h4>Settings Content</h4>
              <p>This is the settings tab content.</p>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="disabled"
              className="basic-tab-panel">
              <h4>Disabled Content</h4>
              <p>This content should not be visible because the tab is disabled.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>

      <div className="example-section">
        <h3>Controlled Tabs</h3>
        <div className="current-selection">
          Active Tab: <strong>{activeTab}</strong>
        </div>

        <div className="control-buttons">
          <button onClick={() => setActiveTab("home")}>Switch to Home</button>
          <button onClick={() => setActiveTab("profile")}>Switch to Profile</button>
          <button onClick={() => setActiveTab("settings")}>Switch to Settings</button>
        </div>

        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          className="controlled-tabs">
          <Tabs.List className="controlled-tab-list">
            <Tabs.Tab
              id="home"
              className="controlled-tab">
              Home
            </Tabs.Tab>
            <Tabs.Tab
              id="profile"
              className="controlled-tab">
              Profile
            </Tabs.Tab>
            <Tabs.Tab
              id="settings"
              className="controlled-tab">
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels className="controlled-tab-panels">
            <Tabs.Panel
              tabId="home"
              className="controlled-tab-panel">
              <h4>Home Content</h4>
              <p>This content is controlled programmatically.</p>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="profile"
              className="controlled-tab-panel">
              <h4>Profile Content</h4>
              <p>Profile content is controlled programmatically.</p>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="settings"
              className="controlled-tab-panel">
              <h4>Settings Content</h4>
              <p>Settings content is controlled programmatically.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>

      <div className="example-section">
        <h3>Vertical Tabs</h3>
        <Tabs
          orientation="vertical"
          defaultActiveTab="user"
          className="vertical-tabs">
          <Tabs.List className="vertical-tab-list">
            <Tabs.Tab
              id="user"
              className="vertical-tab">
              User Settings
            </Tabs.Tab>
            <Tabs.Tab
              id="account"
              className="vertical-tab">
              Account
            </Tabs.Tab>
            <Tabs.Tab
              id="security"
              className="vertical-tab">
              Security
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels className="vertical-tab-panels">
            <Tabs.Panel
              tabId="user"
              className="vertical-tab-panel">
              <h4>User Settings</h4>
              <p>Manage your user settings here.</p>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="account"
              className="vertical-tab-panel">
              <h4>Account Settings</h4>
              <p>Manage your account settings here.</p>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="security"
              className="vertical-tab-panel">
              <h4>Security Settings</h4>
              <p>Manage your security settings here.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>

      <div className="example-section">
        <h3>Custom Styled Tabs</h3>
        <Tabs
          defaultActiveTab="tab1"
          className="custom-tabs">
          <Tabs.List className="custom-tab-list">
            <Tabs.Tab
              id="tab1"
              className="custom-tab">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Dashboard</span>
            </Tabs.Tab>
            <Tabs.Tab
              id="tab2"
              className="custom-tab">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle
                  cx="12"
                  cy="7"
                  r="4"></circle>
              </svg>
              <span>Profile</span>
            </Tabs.Tab>
            <Tabs.Tab
              id="tab3"
              className="custom-tab">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle
                  cx="12"
                  cy="12"
                  r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span>Settings</span>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels className="custom-tab-panels">
            <Tabs.Panel
              tabId="tab1"
              className="custom-tab-panel">
              <h4>Dashboard</h4>
              <p>Welcome to your dashboard! Here are some key metrics:</p>
              <div className="custom-panel-content">
                <div className="metric-card">
                  <h5>Users</h5>
                  <p className="metric">1,254</p>
                </div>
                <div className="metric-card">
                  <h5>Revenue</h5>
                  <p className="metric">$12,543</p>
                </div>
                <div className="metric-card">
                  <h5>Conversion</h5>
                  <p className="metric">5.28%</p>
                </div>
              </div>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="tab2"
              className="custom-tab-panel">
              <h4>Profile Information</h4>
              <p>Manage your profile settings here.</p>
              <div className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                  />
                </div>
                <button className="save-button">Save Changes</button>
              </div>
            </Tabs.Panel>

            <Tabs.Panel
              tabId="tab3"
              className="custom-tab-panel">
              <h4>Application Settings</h4>
              <p>Configure your application settings.</p>
              <div className="settings-options">
                <div className="setting-option">
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked
                    />
                    <span>Enable notifications</span>
                  </label>
                </div>
                <div className="setting-option">
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked
                    />
                    <span>Dark mode</span>
                  </label>
                </div>
                <div className="setting-option">
                  <label>
                    <input type="checkbox" />
                    <span>Auto-save changes</span>
                  </label>
                </div>
              </div>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>

      {/* Styles for the examples */}
      <style>{`
        /* Styles for the tabs examples */
        .tabs-examples {
          margin: 20px 0;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .example-section {
          margin-bottom: 40px;
        }
        
        .example-section h3 {
          margin-bottom: 8px;
        }
        
        .current-selection {
          margin-bottom: 12px;
        }
        
        .control-buttons {
          margin-bottom: 16px;
          display: flex;
          gap: 8px;
        }
        
        .control-buttons button {
          padding: 6px 12px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .control-buttons button:hover {
          background-color: #e0e0e0;
        }
        
        /* Basic tabs styling */
        .basic-tabs {
          display: flex;
          flex-direction: column;
        }
        
        .basic-tab-list {
          display: flex;
          border-bottom: 2px solid #e9ecef;
        }
        
        .basic-tab {
          padding: 8px 16px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }
        
        .basic-tab:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
        }
        
        .basic-tab[data-state="active"] {
          border-bottom-color: #4299e1;
          color: #4299e1;
        }
        
        .basic-tab[data-disabled="true"] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .basic-tab-panels {
          padding: 16px 0;
        }
        
        .basic-tab-panel h4 {
          margin-top: 0;
          margin-bottom: 8px;
        }
        
        /* Controlled tabs styling */
        .controlled-tabs {
          display: flex;
          flex-direction: column;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .controlled-tab-list {
          display: flex;
          background-color: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }
        
        .controlled-tab {
          padding: 12px 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
          color: #495057;
        }
        
        .controlled-tab[data-state="active"] {
          background-color: white;
          color: #228be6;
          box-shadow: inset 0 -2px 0 #228be6;
        }
        
        .controlled-tab-panels {
          padding: 16px;
        }
        
        /* Vertical tabs styling */
        .vertical-tabs {
          display: flex;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .vertical-tab-list {
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
          border-right: 1px solid #e9ecef;
          min-width: 160px;
        }
        
        .vertical-tab {
          padding: 12px 16px;
          text-align: left;
          background: none;
          border: none;
          border-right: 2px solid transparent;
          cursor: pointer;
          font-weight: 500;
        }
        
        .vertical-tab[data-state="active"] {
          background-color: white;
          color: #228be6;
          border-right-color: #228be6;
        }
        
        .vertical-tab-panels {
          flex: 1;
          padding: 16px;
        }
        
        /* Custom styled tabs */
        .custom-tabs {
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .custom-tab-list {
          display: flex;
          background-color: #4a148c;
          padding: 4px;
        }
        
        .custom-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin: 0 4px;
        }
        
        .custom-tab:hover {
          color: rgba(255, 255, 255, 0.9);
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .custom-tab[data-state="active"] {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }
        
        .custom-tab svg {
          stroke-width: 2;
        }
        
        .custom-tab-panels {
          padding: 24px;
          background-color: white;
        }
        
        .custom-panel-content {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }
        
        .metric-card {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 16px;
          min-width: 120px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .metric-card h5 {
          margin-top: 0;
          margin-bottom: 8px;
          color: #666;
          font-weight: 500;
        }
        
        .metric-card .metric {
          font-size: 20px;
          font-weight: 600;
          color: #4a148c;
          margin: 0;
        }
        
        .profile-form {
          margin-top: 16px;
          max-width: 400px;
        }
        
        .form-group {
          margin-bottom: 16px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
        }
        
        .form-group input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .save-button {
          background-color: #4a148c;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .save-button:hover {
          background-color: #6a1b9a;
        }
        
        .settings-options {
          margin-top: 16px;
        }
        
        .setting-option {
          margin-bottom: 12px;
        }
        
        .setting-option label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .setting-option input {
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
};
