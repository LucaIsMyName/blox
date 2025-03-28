import { useState } from 'react';
import { Tabs } from 'blox-ui-react';
import DatabaseViewer from './examples/DatabaseViewer';
import EmailUI from './examples/EmailUI';
import ChatApp from './examples/ChatApp';
import Analytics from './examples/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('database');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Blox UI React Demos</h1>
        <p className="text-gray-600 mt-1">Headless component showcases with Tailwind CSS</p>
      </header>

      <Tabs activeTab={activeTab} onChange={setActiveTab} className="px-6 pt-4">
        <Tabs.List className="flex border-b border-gray-200">
          <Tabs.Tab 
            id="database" 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'database' ? 
              'text-blue-600 border-b-2 border-blue-600' : 
              'text-gray-600 hover:text-gray-900'}`}
          >
            Database Viewer
          </Tabs.Tab>
          <Tabs.Tab 
            id="email" 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'email' ? 
              'text-blue-600 border-b-2 border-blue-600' : 
              'text-gray-600 hover:text-gray-900'}`}
          >
            Email Client
          </Tabs.Tab>
          <Tabs.Tab 
            id="chat" 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'chat' ? 
              'text-blue-600 border-b-2 border-blue-600' : 
              'text-gray-600 hover:text-gray-900'}`}
          >
            Chat App
          </Tabs.Tab>
          <Tabs.Tab 
            id="analytics" 
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'analytics' ? 
              'text-blue-600 border-b-2 border-blue-600' : 
              'text-gray-600 hover:text-gray-900'}`}
          >
            Analytics Dashboard
          </Tabs.Tab>
        </Tabs.List>
        
        <Tabs.Panels className="flex-1 overflow-hidden">
          <Tabs.Panel tabId="database" className="h-full">
            <DatabaseViewer />
          </Tabs.Panel>
          <Tabs.Panel tabId="email" className="h-full">
            <EmailUI />
          </Tabs.Panel>
          <Tabs.Panel tabId="chat" className="h-full">
            <ChatApp />
          </Tabs.Panel>
          <Tabs.Panel tabId="analytics" className="h-full">
            <Analytics />
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
  );
}

export default App;