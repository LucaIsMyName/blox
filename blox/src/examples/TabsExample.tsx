// TabsExample.tsx
import React, { useState } from "react";
import { Tabs } from "../components/Tabs";

export const TabsExample: React.FC = () => {
  // For controlled tabs example
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Tabs Examples</h2>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Basic Tabs (Uncontrolled)</h3>
        <Tabs
          defaultActiveTab="home"
          className="flex flex-col">
          <Tabs.List className="flex border-b border-gray-200">
            <Tabs.Tab
              id="home"
              className="px-4 py-2 border-b-2 border-transparent font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600">
              Home
            </Tabs.Tab>
            <Tabs.Tab
              id="profile"
              className="px-4 py-2 border-b-2 border-transparent font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600">
              Profile
            </Tabs.Tab>
            <Tabs.Tab
              id="settings"
              className="px-4 py-2 border-b-2 border-transparent font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600">
              Settings
            </Tabs.Tab>
            <Tabs.Tab
              id="disabled"
              disabled
              className="px-4 py-2 border-b-2 border-transparent font-medium text-sm opacity-50 cursor-not-allowed">
              Disabled
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels className="py-4">
            <Tabs.Panel tabId="home">
              <h4 className="text-lg font-medium mb-2">Home Content</h4>
              <p className="text-gray-600">This is the home tab content.</p>
            </Tabs.Panel>

            <Tabs.Panel tabId="profile">
              <h4 className="text-lg font-medium mb-2">Profile Content</h4>
              <p className="text-gray-600">This is the profile tab content.</p>
            </Tabs.Panel>

            <Tabs.Panel tabId="settings">
              <h4 className="text-lg font-medium mb-2">Settings Content</h4>
              <p className="text-gray-600">This is the settings tab content.</p>
            </Tabs.Panel>

            <Tabs.Panel tabId="disabled">
              <h4 className="text-lg font-medium mb-2">Disabled Content</h4>
              <p className="text-gray-600">This content should not be visible because the tab is disabled.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Controlled Tabs</h3>
        <div className="mb-3">
          Active Tab: <strong>{activeTab}</strong>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("home")}
            className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm hover:bg-gray-200">
            Switch to Home
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm hover:bg-gray-200">
            Switch to Profile
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm hover:bg-gray-200">
            Switch to Settings
          </button>
        </div>

        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          className="flex flex-col border border-gray-200 rounded-md overflow-hidden">
          <Tabs.List className="flex bg-gray-50 border-b border-gray-200">
            <Tabs.Tab
              id="home"
              className="px-4 py-3 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-[inset_0_-2px_0_#3b82f6]">
              Home
            </Tabs.Tab>
            <Tabs.Tab
              id="profile"
              className="px-4 py-3 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-[inset_0_-2px_0_#3b82f6]">
              Profile
            </Tabs.Tab>
            <Tabs.Tab
              id="settings"
              className="px-4 py-3 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-[inset_0_-2px_0_#3b82f6]">
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels className="p-4">
            <Tabs.Panel tabId="home">
              <h4 className="text-lg font-medium mb-2">Home Content</h4>
              <p className="text-gray-600">This content is controlled programmatically.</p>
            </Tabs.Panel>

            <Tabs.Panel tabId="profile">
              <h4 className="text-lg font-medium mb-2">Profile Content</h4>
              <p className="text-gray-600">Profile content is controlled programmatically.</p>
            </Tabs.Panel>

            <Tabs.Panel tabId="settings">
              <h4 className="text-lg font-medium mb-2">Settings Content</h4>
              <p className="text-gray-600">Settings content is controlled programmatically.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Vertical Tabs</h3>
        <Tabs
          orientation="vertical"
          defaultActiveTab="user"
          className="flex border border-gray-200 rounded-md overflow-hidden">
          <Tabs.List className="flex flex-col bg-gray-50 border-r border-gray-200 min-w-[160px]">
            <Tabs.Tab
              id="user"
              className="px-4 py-3 text-left border-r-2 border-transparent font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-r-blue-500">
              User Settings
            </Tabs.Tab>
            <Tabs.Tab
              id="account"
              className="px-4 py-3 text-left border-r-2 border-transparent font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-r-blue-500">
              Account
            </Tabs.Tab>
            <Tabs.Tab
              id="security"
              className="px-4 py-3 text-left border-r-2 border-transparent font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-r-blue-500">
              Security
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels className="flex-1 p-4">
            <Tabs.Panel tabId="user">
              <h4 className="text-lg font-medium mb-2">User Settings</h4>
              <p className="text-gray-600">Manage your user settings here.</p>
            </Tabs.Panel>

            <Tabs.Panel tabId="account">
              <h4 className="text-lg font-medium mb-2">Account Settings</h4>
              <p className="text-gray-600">Manage your account settings here.</p>
            </Tabs.Panel>

            <Tabs.Panel tabId="security">
              <h4 className="text-lg font-medium mb-2">Security Settings</h4>
              <p className="text-gray-600">Manage your security settings here.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Custom Styled Tabs</h3>
        <Tabs
          defaultActiveTab="tab1"
          className="flex flex-col rounded-lg overflow-hidden shadow-lg">
          <Tabs.List className="flex bg-purple-900 p-1">
            <Tabs.Tab
              id="tab1"
              className="flex items-center gap-2 px-4 py-3 text-white/70 rounded transition-all mx-1 hover:bg-white/10 hover:text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
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
              className="flex items-center gap-2 px-4 py-3 text-white/70 rounded transition-all mx-1 hover:bg-white/10 hover:text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
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
              className="flex items-center gap-2 px-4 py-3 text-white/70 rounded transition-all mx-1 hover:bg-white/10 hover:text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
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

          <Tabs.Panels className="p-6 bg-white">
            <Tabs.Panel tabId="tab1">
              <h4 className="text-lg font-medium mb-2">Dashboard</h4>
              <p className="text-gray-600 mb-4">Welcome to your dashboard! Here are some key metrics:</p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm flex-1 min-w-[120px] text-center">
                  <h5 className="text-gray-600 font-medium mb-2">Users</h5>
                  <p className="text-xl font-semibold text-purple-900">1,254</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm flex-1 min-w-[120px] text-center">
                  <h5 className="text-gray-600 font-medium mb-2">Revenue</h5>
                  <p className="text-xl font-semibold text-purple-900">$12,543</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm flex-1 min-w-[120px] text-center">
                  <h5 className="text-gray-600 font-medium mb-2">Conversion</h5>
                  <p className="text-xl font-semibold text-purple-900">5.28%</p>
                </div>
              </div>
            </Tabs.Panel>

            <Tabs.Panel tabId="tab2">
              <h4 className="text-lg font-medium mb-2">Profile Information</h4>
              <p className="text-gray-600 mb-4">Manage your profile settings here.</p>
              <div className="max-w-md">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <button className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Save Changes</button>
              </div>
            </Tabs.Panel>

            <Tabs.Panel tabId="tab3">
              <h4 className="text-lg font-medium mb-2">Application Settings</h4>
              <p className="text-gray-600 mb-4">Configure your application settings.</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifications"
                    defaultChecked
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="notifications"
                    className="ml-2 block text-sm text-gray-700">
                    Enable notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="darkmode"
                    defaultChecked
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="darkmode"
                    className="ml-2 block text-sm text-gray-700">
                    Dark mode
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autosave"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="autosave"
                    className="ml-2 block text-sm text-gray-700">
                    Auto-save changes
                  </label>
                </div>
              </div>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>
    </div>
  );
};
